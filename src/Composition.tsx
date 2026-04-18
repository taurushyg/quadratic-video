import React from "react";
import {
	AbsoluteFill,
	Audio,
	Easing,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

type NarrationSegment = {
	start: number;
	duration: number;
	text: string;
};

type Scene = {
	title: string;
	accent: string;
	duration: number;
	narration: NarrationSegment[];
	render: (localFrame: number) => React.ReactNode;
};

const FPS = 30;

const sceneDurations = {
	intro: 120,
	definition: 150,
	discriminant: 150,
	formula: 180,
	example: 240,
	outro: 120,
};

const totalDuration = Object.values(sceneDurations).reduce(
	(sum, value) => sum + value,
	0,
);

const equationCard = (text: string, tone: "gold" | "cyan" | "rose" = "gold") => (
	<div
		style={{
			alignSelf: "stretch",
			borderRadius: 30,
			border: `1px solid ${
				tone === "gold"
					? "rgba(255, 209, 102, 0.5)"
					: tone === "cyan"
						? "rgba(110, 231, 255, 0.45)"
						: "rgba(255, 144, 171, 0.45)"
			}`,
			background:
				tone === "gold"
					? "linear-gradient(135deg, rgba(255,209,102,0.12), rgba(255,255,255,0.04))"
					: tone === "cyan"
						? "linear-gradient(135deg, rgba(110,231,255,0.16), rgba(255,255,255,0.03))"
						: "linear-gradient(135deg, rgba(255,144,171,0.14), rgba(255,255,255,0.03))",
			padding: "26px 34px",
			fontSize: 48,
			fontWeight: 700,
			letterSpacing: 1,
			color: "#fffdf7",
			textAlign: "center",
			boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
		}}
	>
		{text}
	</div>
);

const bulletList = (items: string[]) => (
	<div
		style={{
			display: "grid",
			gap: 18,
			marginTop: 12,
		}}
	>
		{items.map((item) => (
			<div
				key={item}
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
					fontSize: 34,
					color: "#f7efe2",
				}}
			>
				<div
					style={{
						width: 12,
						height: 12,
						borderRadius: 999,
						background: "#ffd166",
						flexShrink: 0,
					}}
				/>
				<div>{item}</div>
			</div>
		))}
	</div>
);

const scenes: Scene[] = [
	{
		title: "什么是一元二次方程",
		accent: "线性升级到抛物线",
		duration: sceneDurations.intro,
		narration: [
			{ start: 0, duration: 42, text: "今天用一分钟，带你搞懂什么是一元二次方程。" },
			{ start: 42, duration: 36, text: "它的标准形式是 ax 平方加 bx 加 c 等于零。" },
			{ start: 78, duration: 42, text: "记住三个关键词，最高次数是二，未知数只有一个，而且 a 不能等于零。" },
		],
		render: () => (
			<>
				<div className="eyebrow">数学 60 秒讲透</div>
				<h1 className="heroTitle">一元二次方程</h1>
				<div className="heroSubtitle">
					抓住三个关键词: 最高次数是 2、未知数只有一个、标准式最重要
				</div>
				<div className="formulaRow">
					{equationCard("ax² + bx + c = 0", "gold")}
				</div>
			</>
		),
	},
	{
		title: "标准形式怎么看",
		accent: "a 不能等于 0",
		duration: sceneDurations.definition,
		narration: [
			{ start: 0, duration: 45, text: "接着看三个系数的作用。a 决定抛物线开口方向和弯曲程度。" },
			{ start: 45, duration: 45, text: "b 会影响对称轴的位置，c 则表示图像和 y 轴的交点。" },
			{ start: 90, duration: 60, text: "只要看到只有一个未知数 x，而且最高次数是二，这类题基本就可以往一元二次方程上判断。" },
		],
		render: () => (
			<>
				<div className="sectionLabel">01 标准形式</div>
				<h2 className="sectionTitle">先认清三个系数各自的角色</h2>
				<div className="twoCol">
					<div className="infoPanel">
						{bulletList([
							"a 决定开口方向和弯曲程度",
							"b 影响对称轴位置",
							"c 是图像与 y 轴的交点",
						])}
					</div>
					<div className="stackPanel">
						{equationCard("a ≠ 0", "rose")}
						{equationCard("未知数只有 x", "cyan")}
					</div>
				</div>
			</>
		),
	},
	{
		title: "判别式的作用",
		accent: "先判断有几个实数根",
		duration: sceneDurations.discriminant,
		narration: [
			{ start: 0, duration: 45, text: "然后是做题特别常用的判别式，Delta 等于 b 平方减四 a c。" },
			{ start: 45, duration: 45, text: "如果 Delta 大于零，方程有两个不相等的实数根。" },
			{ start: 90, duration: 60, text: "如果等于零，就是一个重根；如果小于零，在实数范围内就没有解。" },
		],
		render: () => (
			<>
				<div className="sectionLabel">02 判别式</div>
				<h2 className="sectionTitle">Δ = b² - 4ac 决定方程有几个实数解</h2>
				<div className="threeCards">
					<div className="valueCard">
						<div className="valueCardTitle">Δ &gt; 0</div>
						<div className="valueCardBody">两个不相等的实数根</div>
					</div>
					<div className="valueCard">
						<div className="valueCardTitle">Δ = 0</div>
						<div className="valueCardBody">一个重根</div>
					</div>
					<div className="valueCard">
						<div className="valueCardTitle">Δ &lt; 0</div>
						<div className="valueCardBody">没有实数根</div>
					</div>
				</div>
			</>
		),
	},
	{
		title: "求根公式",
		accent: "代入系数直接求解",
		duration: sceneDurations.formula,
		narration: [
			{ start: 0, duration: 48, text: "如果题目不好因式分解，我们就直接上求根公式。" },
			{ start: 48, duration: 60, text: "x 等于负 b 加减根号下 b 平方减四 a c，再整体除以二 a。" },
			{ start: 108, duration: 72, text: "做题顺序不要乱，先找出 a、b、c，再算判别式，最后代入公式，这样最稳。" },
		],
		render: () => (
			<>
				<div className="sectionLabel">03 求根公式</div>
				<h2 className="sectionTitle">当题目不好因式分解时，直接用公式最稳</h2>
				<div className="formulaBoard">
					<div className="formulaBoardTop">x = (-b ± √(b² - 4ac)) / 2a</div>
					<div className="formulaBoardHint">
						顺序不要乱: 先看 a、b、c，再算 Δ，最后代入公式
					</div>
				</div>
				<div className="tipRow">
					<div className="tipPill">配方法能推到这个公式</div>
					<div className="tipPill">考试里常和判别式一起用</div>
				</div>
			</>
		),
	},
	{
		title: "代一个例题",
		accent: "x² - 5x + 6 = 0",
		duration: sceneDurations.example,
		narration: [
			{ start: 0, duration: 48, text: "我们用 x 平方减五 x 加六等于零，来快速练一遍。" },
			{ start: 48, duration: 48, text: "先读出 a 等于一，b 等于负五，c 等于六。" },
			{ start: 96, duration: 54, text: "判别式等于负五的平方减四乘一乘六，结果是 1。" },
			{ start: 150, duration: 54, text: "代入公式后，x 等于五加减一，再除以二。" },
			{ start: 204, duration: 36, text: "所以最后得到两个解，x 一等于三，x 二等于二。" },
		],
		render: (localFrame) => {
			const reveal = interpolate(localFrame, [0, 210], [0.6, 1], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			});

			return (
				<>
					<div className="sectionLabel">04 例题演示</div>
					<h2 className="sectionTitle">解方程 x² - 5x + 6 = 0</h2>
					<div className="exampleGrid" style={{ transform: `scale(${reveal})` }}>
						<div className="exampleStep">
							<div className="exampleStepIndex">Step 1</div>
							<div className="exampleStepText">a = 1, b = -5, c = 6</div>
						</div>
						<div className="exampleStep">
							<div className="exampleStepIndex">Step 2</div>
							<div className="exampleStepText">Δ = (-5)² - 4×1×6 = 1</div>
						</div>
						<div className="exampleStep">
							<div className="exampleStepIndex">Step 3</div>
							<div className="exampleStepText">x = (5 ± 1) / 2</div>
						</div>
						<div className="exampleStep">
							<div className="exampleStepIndex">Answer</div>
							<div className="exampleStepText">x₁ = 3, x₂ = 2</div>
						</div>
					</div>
					<div className="exampleFooter">
						这个题也可以因式分解成 (x - 2)(x - 3) = 0
					</div>
				</>
			);
		},
	},
	{
		title: "最后记住这三步",
		accent: "认式子  看判别式  再求根",
		duration: sceneDurations.outro,
		narration: [
			{ start: 0, duration: 45, text: "最后帮你记住三步，先把式子整理成标准形式。" },
			{ start: 45, duration: 39, text: "第二步先看判别式，判断有几个实数根。" },
			{ start: 84, duration: 36, text: "第三步用公式或者因式分解求根，这样大部分基础题就都能拿下。" },
		],
		render: () => (
			<>
				<div className="sectionLabel">05 三步记忆</div>
				<h2 className="sectionTitle">做题时就按这个顺序走</h2>
				<div className="threeCards">
					<div className="memoryCard">1. 写成 ax² + bx + c = 0</div>
					<div className="memoryCard">2. 先算 Δ = b² - 4ac</div>
					<div className="memoryCard">3. 用公式或因式分解求根</div>
				</div>
				<div className="closingLine">学会这套流程，大部分基础题都能稳稳拿下。</div>
			</>
		),
	},
];

const getActiveNarration = (scene: Scene, localFrame: number) => {
	return (
		scene.narration.find(
			(segment) =>
				localFrame >= segment.start &&
				localFrame < segment.start + segment.duration,
		) ?? scene.narration[scene.narration.length - 1]
	);
};

const SubtitleBar: React.FC<{
	text: string;
	localFrame: number;
}> = ({ text, localFrame }) => {
	const emphasis = spring({
		fps: FPS,
		frame: localFrame,
		config: {
			damping: 18,
			stiffness: 180,
		},
	});
	const opacity = interpolate(emphasis, [0, 1], [0.75, 1]);

	return (
		<div className="subtitleWrap" style={{ opacity }}>
			<div className="subtitleLabel">口播字幕</div>
			<div className="subtitleText">{text}</div>
		</div>
	);
};

const SceneShell: React.FC<{
	scene: Scene;
	localFrame: number;
}> = ({ scene, localFrame }) => {
	const { fps } = useVideoConfig();
	const entrance = spring({
		fps,
		frame: localFrame,
		config: {
			damping: 14,
			stiffness: 120,
			mass: 0.8,
		},
	});
	const contentOpacity = interpolate(
		localFrame,
		[0, 12, scene.duration - 14, scene.duration],
		[0, 1, 1, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.inOut(Easing.ease),
		},
	);
	const translateY = interpolate(entrance, [0, 1], [40, 0]);
	const gridShift = (localFrame * 0.4) % 64;
	const activeNarration = getActiveNarration(scene, localFrame);

	return (
		<AbsoluteFill
			style={{
				background:
					"radial-gradient(circle at 20% 20%, rgba(255,209,102,0.16), transparent 28%), radial-gradient(circle at 80% 18%, rgba(255,144,171,0.18), transparent 24%), linear-gradient(135deg, #14111d 0%, #1c2238 48%, #10212b 100%)",
				color: "white",
				fontFamily: '"Baskerville", "Times New Roman", "Noto Serif SC", serif',
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: -120,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
					transform: `translate(${gridShift}px, ${gridShift * 0.4}px)`,
					opacity: 0.22,
				}}
			/>
			<div className="glowOrb glowOne" />
			<div className="glowOrb glowTwo" />
			<div
				style={{
					flex: 1,
					padding: "74px 84px 34px",
					display: "flex",
					flexDirection: "column",
					opacity: contentOpacity,
					transform: `translateY(${translateY}px)`,
				}}
			>
				<div className="topBar">
					<div className="topBarChip">{scene.title}</div>
					<div className="topBarAccent">{scene.accent}</div>
				</div>
				<div className="contentWrap">{scene.render(localFrame)}</div>
				<SubtitleBar text={activeNarration.text} localFrame={localFrame} />
				<div className="progressTrack">
					<div
						className="progressFill"
						style={{
							width: `${interpolate(localFrame, [0, scene.duration], [0, 100], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							})}%`,
						}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const CurrentScene: React.FC = () => {
	const frame = useCurrentFrame();
	let elapsed = 0;

	for (const scene of scenes) {
		if (frame < elapsed + scene.duration) {
			return <SceneShell scene={scene} localFrame={frame - elapsed} />;
		}
		elapsed += scene.duration;
	}

	return (
		<SceneShell
			scene={scenes[scenes.length - 1]}
			localFrame={sceneDurations.outro - 1}
		/>
	);
};

export const QuadraticExplainer: React.FC = () => {
	return (
		<>
			<Audio src={staticFile("voiceover.mp3")} />
			<CurrentScene />
		</>
	);
};

export const quadraticVideoMeta = {
	durationInFrames: totalDuration,
	fps: FPS,
	width: 1280,
	height: 720,
};
