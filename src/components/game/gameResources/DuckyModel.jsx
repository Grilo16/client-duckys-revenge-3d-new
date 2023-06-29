/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/static/MagicDucky.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, vec3 } from '@react-three/rapier'
import {  useSelector } from 'react-redux'
import { selectedDirection, selectedJumpStatus } from 'features/reducers/gameConsoleReducer'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three";

export const DuckyModel = (props) => {
  const { nodes, materials } = useGLTF(process.env.PUBLIC_URL+'/static/DuckyAssets/rubber_duck_toy_4k.gltf')
  const {mouse} = useThree()
  

  const duckyRef = useRef()
  const duckyMeshRef = useRef()

  const moveSpeed = 8

  const direction = useSelector(selectedDirection)
  const jumpStatus = useSelector(selectedJumpStatus)


const triggerJump = (jumpStatus, delta) =>
      jumpStatus
      ? duckyRef.current.applyImpulse({ x: delta, y: 200, z: delta }, true)
      : null


const changeDirection = (direction, delta) => 

      direction === "up"  
      ? duckyRef.current.setLinvel({x: -moveSpeed , y: delta -2, z: -mouse.x * 10  + delta}, true)
      :direction === "down" 
      ? duckyRef.current.setLinvel({x: moveSpeed,  y: delta -2, z: mouse.x * 10 + delta }, true)
      :direction === "right"
      ? duckyRef.current.setLinvel({x: delta,  y: delta -2, z: -moveSpeed, }, true)
      :direction === "left"
      ? duckyRef.current.setLinvel({x: delta,  y: delta -2, z: moveSpeed, }, true)
      :null
      
      
      useFrame(({mouse, camera, ...state}, delta) => {
        const duckyPos = duckyMeshRef.current.parent?.position 
        camera.position.x = THREE.MathUtils.lerp(duckyPos.x, duckyPos.x + 42, 0.1)
        camera.position.y = THREE.MathUtils.lerp(duckyPos.y, duckyPos.y + 10 + 5 * mouse.y, 0.1)
        camera.position.z = THREE.MathUtils.lerp(duckyPos.z, duckyPos.z - 1, 0.1)
       camera.lookAt(duckyPos)
       camera.updateMatrixWorld()
        

        duckyRef?.current?.setRotation({
          x: 0,
          y: (Math.PI/2 +mouse.x) +1,
          z: 0,
          w: mouse.x -2.5 
        })

  
        triggerJump(jumpStatus, delta)
        if(!jumpStatus){
          changeDirection(direction, delta)
        }
        return null
      })

  return (
    
    <RigidBody 
        ref={duckyRef} 
        name='ducky'
        type="dynamic"
        colliders="cuboid"
        density={500}
        position={[220, 2, 100]}
        scale={4} 
        >
        <mesh 
          castShadow 
          ref={duckyMeshRef}   
          geometry={nodes.rubber_duck_toy.geometry} 
          material={materials.rubber_duck_toy} 
          />
    </RigidBody>
  )
}

useGLTF.preload(process.env.PUBLIC_URL+'/static/DuckyAssets/rubber_duck_toy_4k.gltf')