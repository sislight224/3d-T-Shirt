import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Plane, Sky } from '@react-three/drei'

import { Tshirt } from './'
import { Loader } from '../containers'
import { Irgb } from '../types'

const Model = ({
	isMobile,
	color,
	logo,
	isLogo,
	full,
	isFull,
	logoP,
	logoS,
	textureId
}: {
	isMobile: boolean
	color: Irgb
	logo: string
	isLogo: boolean
	isFull: boolean
	logoS: number
	logoP: number
	full: string,
	textureId: number
}) => {
	return (
		<Canvas
			shadows
			gl={{ preserveDrawingBuffer: true }}
			camera={{
				fov: 25,
				position: [0, 5, 20],
			}}
		>
			<Suspense fallback={<Loader />}>
				<Sky sunPosition={[0, 1, 1]} />
				{/* <pointLight position={[-1, 1.5, -2]} intensity={1.5} color={"#ffffff"} /> */}
				<directionalLight 
                    position={[0, 0.7, -3]} 
                    intensity={2}  
                    shadow-mapSize={128} 
                    castShadow
                    shadow-camera-top={2}
                    shadow-camera-right={2}
                    shadow-camera-bottom={2}
                    shadow-camera-left={2}
                    shadow-camera-near={1}
                    shadow-camera-far={10}
                  />
				<hemisphereLight groundColor={'#111'} intensity={1.5} />
				<Tshirt
					logo={logo}
					full={full}
					color={color}
					logoP={logoP}
					logoS={logoS}
					isMobile={isMobile}
					isFull={isFull}
					isLogo={isLogo}
					textureId={textureId}
				/>
				<OrbitControls
					target={[0, isMobile ? 0.8 : 0.4, 0]}
					maxDistance={30}
					minDistance={2}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 8}
					enablePan={false}
				/>
				{/* <Plane position={[0,-0.5,0]} scale={[10, 10, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
					<meshStandardMaterial color={"#aaa"} />
				</Plane> */}

				{/* <LightWithHelper />
				<mesh castShadow>
					<boxGeometry args={[2, 4, 2]} />
					<axesHelper args={[10]} />
					<meshStandardMaterial color={"blue"}/>
				</mesh>

				<mesh position={[0,-0.1,0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<planeGeometry args={[20, 20]} />
					<meshStandardMaterial />
				</mesh> */}

			</Suspense>
		</Canvas>
	)
}

function LightWithHelper() {
	return (
		<spotLight
			penumbra={3}
			angle={Math.PI / 6}
			intensity={80}
			color={0xffea00}
			position={[2, 5, 1]}
			castShadow
		></spotLight>
	)
}

export default Model
