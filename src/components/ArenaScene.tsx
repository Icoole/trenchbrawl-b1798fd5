import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import dogeAsset from "@/assets/fighter-doge.png.asset.json";
import pepeAsset from "@/assets/fighter-pepe.png.asset.json";

const DOGE_URL = dogeAsset.url;
const PEPE_URL = pepeAsset.url;
const CYAN = "#3ec9f5";
const EMBER = "#ff9a2e";
const LOW_HP = "#ff5d4d";

/** One full battle loop: idle → DOGE jab → PEPE charges a SUPER → super smash → recover → KO reset. */
const CYCLE = 10;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
/** Eased 0→1 ramp across the time window [a, b]. */
const win = (t: number, a: number, b: number) => smooth((t - a) / (b - a));
/** True the frame `mark` is crossed between the previous and current loop time. */
const crossed = (prev: number, now: number, mark: number) => prev < mark && now >= mark;

type BattleState = {
  t: number;
  hpA: number;
  hpB: number;
  hitA: number;
  hitB: number;
  flash: number;
  shake: number;
  charge: number;
  waveT: number;
  waveBig: number;
  sparksT: number;
  sparksBig: number;
};

const TMP_COLOR = new THREE.Color();

let softTex: THREE.CanvasTexture | null = null;
/** Soft radial texture used for sprite edges, auras, glows and the impact flash. */
function getSoftTex() {
  if (!softTex) {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.16, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.58, "rgba(255,255,255,0.94)");
    grad.addColorStop(0.85, "rgba(255,255,255,0.32)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    softTex = new THREE.CanvasTexture(canvas);
  }
  return softTex;
}

function Fighter({
  url,
  side,
  color,
  battle,
}: {
  url: string;
  side: 1 | -1;
  color: string;
  battle: React.RefObject<BattleState>;
}) {
  const tex = useTexture(url);
  const alpha = getSoftTex();
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const s = battle.current!;
    const t = s.t;
    const dash =
      side === -1
        ? win(t, 2.0, 2.5) * (1 - win(t, 2.5, 3.2))
        : win(t, 5.2, 5.7) * (1 - win(t, 5.7, 6.6));
    const hit = side === -1 ? s.hitA : s.hitB;
    const charge = side === 1 ? s.charge : 0;
    const bob = Math.sin(clock.elapsedTime * 2.1 + side * 1.7) * 0.08;
    const g = group.current;
    const n = inner.current;
    if (!g || !n) return;
    g.position.x = side * 3.1 - side * dash * 2.2 + side * hit * 0.7;
    g.position.y = 1.8 + bob + dash * 0.3;
    g.position.z = dash * 0.6;
    g.rotation.y = -side * 0.2;
    n.rotation.z = -side * dash * 0.3 + side * hit * 0.25;
    n.scale.set(1 + hit * 0.12 + charge * 0.05, 1 - hit * 0.16, 1);
    if (mat.current) {
      mat.current.color.setRGB(
        1,
        1 - hit * 0.15 - charge * 0.2,
        1 - hit * 0.25 - charge * 0.45,
      );
    }
  });

  return (
    <group ref={group} position={[side * 3.1, 1.8, 0]}>
      {/* ground glow under the fighter */}
      <mesh position={[0, -1.77, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={alpha}
          color={color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <group ref={inner}>
        {/* colored aura behind the fighter */}
        <mesh position={[0, 0, -0.5]} scale={1.9}>
          <planeGeometry args={[2.4, 3.1]} />
          <meshBasicMaterial
            map={alpha}
            color={color}
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[2.4, 3.1]} />
          <meshBasicMaterial
            ref={mat}
            map={tex}
            alphaMap={alpha}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Fighting-game health bar; remaining HP anchored toward the center like a real versus screen. */
function HealthBar({
  side,
  color,
  battle,
}: {
  side: 1 | -1;
  color: string;
  battle: React.RefObject<BattleState>;
}) {
  const W = 2.6;
  const fill = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const s = battle.current!;
    const hp = clamp01(side === -1 ? s.hpA : s.hpB);
    const f = fill.current;
    if (!f) return;
    f.scale.x = Math.max(0.02, hp);
    f.position.x = (side === -1 ? 1 : -1) * ((W * (1 - hp)) / 2);
    TMP_COLOR.set(color);
    if (hp < 0.35) TMP_COLOR.lerp(new THREE.Color(LOW_HP), (0.35 - hp) / 0.35);
    (f.material as THREE.MeshBasicMaterial).color.copy(TMP_COLOR);
  });

  return (
    <group position={[side * 2.4, 4.35, 0]}>
      <mesh>
        <planeGeometry args={[W + 0.2, 0.4]} />
        <meshBasicMaterial color="#081527" toneMapped={false} />
      </mesh>
      <mesh ref={fill} position={[0, 0, 0.01]}>
        <planeGeometry args={[W, 0.26]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Energy orb that grows while PEPE charges his super, then rides the dash into the impact. */
function ChargeOrb({ battle }: { battle: React.RefObject<BattleState> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const s = battle.current!;
    const c = s.charge;
    const dash = win(s.t, 5.2, 5.7) * (1 - win(s.t, 5.7, 6.6));
    const m = mesh.current;
    if (!m) return;
    m.position.set(3.1 - dash * 2.2 - 0.5, 2.0, 0.7);
    m.scale.setScalar(Math.max(0.001, c * (0.5 + Math.sin(clock.elapsedTime * 14) * 0.04)));
    (m.material as THREE.MeshBasicMaterial).opacity = Math.min(1, c * 1.4);
    if (light.current) light.current.intensity = c * 160;
  });

  return (
    <>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={EMBER}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={light} position={[2.6, 2, 1]} color={EMBER} intensity={0} distance={9} />
    </>
  );
}

/** Expanding ground shockwave ring at each impact. */
function Shockwave({ battle }: { battle: React.RefObject<BattleState> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const lastT = useRef(-1);
  const start = useRef(0);
  const big = useRef(0);

  useFrame(({ clock }) => {
    const s = battle.current!;
    if (s.waveT !== lastT.current) {
      lastT.current = s.waveT;
      start.current = clock.elapsedTime;
      big.current = s.waveBig;
    }
    const m = mesh.current;
    if (!m) return;
    const dur = big.current ? 0.8 : 0.5;
    const p = clamp01((clock.elapsedTime - start.current) / dur);
    const active = s.waveT >= 0 && p < 1;
    m.visible = active;
    if (!active) return;
    m.scale.setScalar(0.4 + p * (big.current ? 6.5 : 3.2));
    m.position.set(big.current ? -1.6 : 0.4, 0.06, 0.6);
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = (1 - p) * (big.current ? 0.9 : 0.55);
    mat.color.set(big.current ? EMBER : CYAN);
  });

  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} visible={false}>
      <ringGeometry args={[0.82, 1, 64]} />
      <meshBasicMaterial
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

const SPARK_N = 26;

function Sparks({
  battle,
  big,
  color,
}: {
  battle: React.RefObject<BattleState>;
  big: boolean;
  color: string;
}) {
  const points = useRef<THREE.Points>(null);
  const lastT = useRef(-1);
  const age = useRef(99);
  const vel = useMemo(() => new Float32Array(SPARK_N * 3), []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SPARK_N * 3), 3));
    return g;
  }, []);

  useFrame((_, rawDt) => {
    const s = battle.current!;
    const dt = Math.min(rawDt, 0.05);
    if (s.sparksT !== lastT.current) {
      lastT.current = s.sparksT;
      age.current = 0;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const px = big ? -1.6 : 0.4;
      const py = 1.9;
      const pz = 0.6;
      const speed = big ? 4.5 : 2.6;
      for (let i = 0; i < SPARK_N; i++) {
        pos.setXYZ(i, px, py, pz);
        const a = Math.random() * Math.PI * 2;
        const e = Math.random() * Math.PI - Math.PI / 2;
        const sp = speed * (0.4 + Math.random() * 0.6);
        vel[i * 3] = Math.cos(a) * Math.cos(e) * sp;
        vel[i * 3 + 1] = Math.abs(Math.sin(e)) * sp * 0.9 + 1.2;
        vel[i * 3 + 2] = Math.sin(a) * Math.cos(e) * sp * 0.6;
      }
      pos.needsUpdate = true;
    }
    const p = points.current;
    if (!p) return;
    const mat = p.material as THREE.PointsMaterial;
    if (age.current < 0.9) {
      age.current += dt;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < SPARK_N; i++) {
        pos.setXYZ(
          i,
          pos.getX(i) + vel[i * 3] * dt,
          pos.getY(i) + vel[i * 3 + 1] * dt,
          pos.getZ(i) + vel[i * 3 + 2] * dt,
        );
        vel[i * 3 + 1] -= 6 * dt;
      }
      pos.needsUpdate = true;
      mat.opacity = Math.max(0, 1 - age.current / 0.9);
    } else {
      mat.opacity = 0;
    }
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        color={color}
        size={big ? 0.2 : 0.13}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Full-screen white flash on impacts and KOs. */
function FlashQuad({ battle }: { battle: React.RefObject<BattleState> }) {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (mat.current) mat.current.opacity = Math.min(1, battle.current!.flash) * 0.8;
  });
  return (
    <mesh position={[0, 2.4, 2.5]}>
      <planeGeometry args={[18, 11]} />
      <meshBasicMaterial
        ref={mat}
        map={getSoftTex()}
        color="#ffffff"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Warm light that swells with each impact. */
function ImpactLight({ battle }: { battle: React.RefObject<BattleState> }) {
  const l = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (l.current) l.current.intensity = battle.current!.flash * 260;
  });
  return <pointLight ref={l} position={[0, 2.5, 2]} color="#ffe9c9" intensity={0} distance={20} />;
}

/** The battle director: one fixed 10-second loop driving fighters, HUD and effects. */
function Battle() {
  const battle = useRef<BattleState>({
    t: 0,
    hpA: 1,
    hpB: 1,
    hitA: 0,
    hitB: 0,
    flash: 0,
    shake: 0,
    charge: 0,
    waveT: -1,
    waveBig: 0,
    sparksT: -1,
    sparksBig: 0,
  });

  useFrame((_, rawDt) => {
    const s = battle.current;
    const dt = Math.min(rawDt, 0.05);
    const prev = s.t;
    s.t = (s.t + dt) % CYCLE;

    // Loop wrapped: if DOGE was flattened by the super, KO flash and start a fresh round.
    if (s.t < prev && s.hpA <= 0.03) {
      s.flash = 1.3;
      s.shake = 0.8;
      s.hpA = 1;
      s.hpB = 1;
    }

    s.charge = win(s.t, 4.2, 5.2) * (1 - win(s.t, 5.2, 5.5));
    s.hitA *= Math.exp(-4 * dt);
    s.hitB *= Math.exp(-4 * dt);
    s.flash *= Math.exp(-5 * dt);
    s.shake *= Math.exp(-3.5 * dt);

    if (crossed(prev, s.t, 2.5)) {
      // DOGE's jab lands on PEPE.
      s.hitB = 1;
      s.hpB = Math.max(0.22, s.hpB - 0.18);
      s.flash = Math.max(s.flash, 0.45);
      s.shake = Math.max(s.shake, 0.45);
      s.sparksT = s.t;
      s.sparksBig = 0;
      s.waveT = s.t;
      s.waveBig = 0;
    }
    if (crossed(prev, s.t, 5.7)) {
      // PEPE's super smash lands on DOGE.
      s.hitA = 1;
      s.hpA -= 0.46;
      s.flash = 1.1;
      s.shake = 1;
      s.sparksT = s.t;
      s.sparksBig = 1;
      s.waveT = s.t;
      s.waveBig = 1;
    }
  });

  return (
    <>
      <Fighter url={DOGE_URL} side={-1} color={CYAN} battle={battle} />
      <Fighter url={PEPE_URL} side={1} color={EMBER} battle={battle} />
      <HealthBar side={-1} color={CYAN} battle={battle} />
      <HealthBar side={1} color={EMBER} battle={battle} />
      <ChargeOrb battle={battle} />
      <Shockwave battle={battle} />
      <Sparks battle={battle} big={false} color={CYAN} />
      <Sparks battle={battle} big color={EMBER} />
      <FlashQuad battle={battle} />
      <ImpactLight battle={battle} />
    </>
  );
}

function Arena() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.2;
    }
  });

  return (
    <group>
      {/* dais */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[5.6, 6.2, 0.6, 64]} />
        <meshStandardMaterial color="#122a52" metalness={0.65} roughness={0.35} />
      </mesh>
      {/* arena floor */}
      <mesh position={[0, 0.01, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[5.6, 64]} />
        <meshStandardMaterial color="#0c1f42" metalness={0.5} roughness={0.55} />
      </mesh>
      {/* glowing boundary ring */}
      <mesh ref={ring} position={[0, 0.03, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[5.5, 5.9, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* inner ember ring */}
      <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[4.6, 4.68, 96]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Camera with a gentle lean plus combat shake on impacts. */
function CameraRig({
  children,
  battle,
}: {
  children: React.ReactNode;
  battle: React.RefObject<BattleState>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const s = battle.current!.shake;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.14, Math.min(delta * 2, 1));
    g.position.set((Math.random() - 0.5) * s * 0.22, (Math.random() - 0.5) * s * 0.18, 0);
  });

  return <group ref={group}>{children}</group>;
}

export default function ArenaScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const battle = useRef<BattleState>({
    t: 0,
    hpA: 1,
    hpB: 1,
    hitA: 0,
    hitB: 0,
    flash: 0,
    shake: 0,
    charge: 0,
    waveT: -1,
    waveBig: 0,
    sparksT: -1,
    sparksBig: 0,
  });

  return (
    <div ref={wrapRef} data-arena className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.4, 9.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          wrapRef.current?.setAttribute("data-scene-ready", "");
        }}
      >
        <fog attach="fog" args={["#0a1c3a", 13, 28]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[-6, 5, 5]} intensity={140} color={CYAN} />
        <pointLight position={[6, 3.5, 2]} intensity={90} color={EMBER} />
        <pointLight position={[0, 4, 6]} intensity={60} color="#8fd8ff" />
        <CameraRig battle={battle}>
          <Suspense fallback={null}>
            <BattleInner battle={battle} />
          </Suspense>
          <Arena />
          <Sparkles count={90} scale={[16, 8, 16]} size={3} speed={0.35} color="#7ad9ff" position={[0, 3, 0]} />
          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} color="#bcdcff" />
            <Lightformer intensity={1.4} color={CYAN} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[14, 2, 1]} />
            <Lightformer intensity={1.1} color={EMBER} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
          </Environment>
        </CameraRig>
      </Canvas>
    </div>
  );
}

/** Battle contents live in their own component so texture loading suspends inside it. */
function BattleInner({ battle }: { battle: React.RefObject<BattleState> }) {
  return <Battle battleRef={battle} />;
}
