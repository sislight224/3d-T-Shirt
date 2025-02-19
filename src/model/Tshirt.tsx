import { useEffect } from 'react'
import { useGLTF, useTexture, Decal } from '@react-three/drei'
import * as THREE from 'three'

import modelGltf from '../assets/3d/tshirt.glb'
import shirtModel from '../assets/3d/folded_shirt_men.glb';
import { Irgb } from '../types'

const Tshirt = ({
	logo,
	full,
	color,
	logoP,
	logoS,
	isMobile,
	isFull,
	isLogo,
	textureId
}: {
	logo: string
	full: string
	color: Irgb
	logoP: number
	logoS: number
	isMobile: boolean
	isFull: boolean
	isLogo: boolean
	textureId: number
}) => {
	// const { nodes, materials } = useGLTF(modelGltf) as any
	const shirtModel1 = useGLTF(shirtModel) as any
	const {nodes, materials} = useGLTF(shirtModel) as any

	// const [
	// 	// INIT BED TEXTURES
	// 	glow,
	// 	grace,
	// 	inari,
	// 	leatherlook,
	// 	malmo,
	// 	now_or_never,
	// 	riviera,
	// 	terra,
	// 	terra1,
	// ] = useTexture([
	// 	"./options/textures/1.jpeg",
	// 	"./options/textures/2.jpeg",
	// 	"./options/textures/3.jpeg",
	// 	"./options/textures/4.jpeg",
	// 	"./options/textures/5.jpeg",
	// 	"./options/textures/6.jpeg",
	// 	"./options/textures/7.jpeg",
	// 	"./options/textures/8.jpeg",
	// 	"./options/textures/9.jpeg",
	// ]);

	const [
		// INIT BED TEXTURES
		glow,
		grace,
		inari,
		leatherlook,
		malmo,
		now_or_never,
		riviera,
		terra,
	] = useTexture([
		"./options/texture/1.jpg",
		"./options/texture/2.jpg",
		"./options/texture/3.jpeg",
		"./options/texture/4.jpeg",
		"./options/texture/5.jpg",
		"./options/texture/6.jpeg",
		"./options/texture/7.jpg",
		"./options/texture/8.jpg",
	]);

	const bedMaterials = [
		glow,
		grace,
		inari,
		leatherlook,
		malmo,
		now_or_never,
		riviera,
		terra,
	];
	bedMaterials.forEach(texture => {
		// texture.flipY = false
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(0.01, 0.01)
	});

	Object.keys(materials).forEach((key) => {
		// if(key == "1_BACK_1950_15" || key == "1_BACK_1950_16") return;
		materials[key].map = bedMaterials[textureId];
		materials[key].clipShadows = true;
		materials[key].metalness = 0;
		materials[key].roughness = 0.9;
		materials[key].color = new THREE.Color(color.r / 255, color.g / 255, color.b / 255);
	});

	materials[""] = bedMaterials[2];

	console.log("nodes.....", nodes);
	console.log("materials.......", materials);

	const logoTex = useTexture(logo)
	const fullTex = useTexture(full)

	useEffect(() => {
		console.log('logo:', logo)
	}, [logo])

	fullTex.colorSpace = THREE.SRGBColorSpace
	logoTex.colorSpace = THREE.SRGBColorSpace

	useEffect(() => {
		// if (color.r < 5 && color.g < 5 && color.b < 5) {
		// 	materials.color.color.r = 5
		// 	materials.color.color.g = 5
		// 	materials.color.color.b = 5
		// } else {
		// 	materials.color.color.r = color.r
		// 	materials.color.color.g = color.g
		// 	materials.color.color.b = color.b
		// }
	}, [color])

	const genP = () => {
		switch (logoP) {
			case 0:
				return -0.075
			case 1:
				return 0
			case 2:
				return 0.075
			default:
				return 0
		}
	}
	const genS = () => {
		switch (logoS) {
			case 0:
				return 0.09
			case 1:
				return 0.12
			case 2:
				return 0.17
		}
	}

	return (
		<group scale={isMobile ? 6 : 9} castShadow>
			{/* <mesh
				castShadow
				receiveShadow
				name="tshirt"
				geometry={nodes.folded_shirt_gftl_Scene_Node_0.geometry}
				material={materials["1_FRONT_1950_13"]}
				position={[0, isMobile ? 0.35 : 0.1, 0]}
				dispose={null}
			>
				{isFull && (
					<Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
						<meshBasicMaterial map={fullTex} />
					</Decal>
				)}
				{isLogo && (
					<Decal
						position={[genP(), 0.08, 0.13]}
						rotation={[0, 0, 0]}
						scale={genS()}
						map={logoTex}
						depthTest={true}
						// depthWrite={true}
					/>
				)}
			</mesh> */}
			<primitive object={shirtModel1.scene}/>
		</group>
	)
}

export default Tshirt
