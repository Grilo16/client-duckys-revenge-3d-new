/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/static/Spike.glb
*/

import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { InstancedRigidBodies, CuboidCollider } from '@react-three/rapier'

export const SpikeModel = (props) =>  {
  const { nodes, materials } = useGLTF(process.env.PUBLIC_URL+'/static/Spike.glb')

   const count = 50 
   const spikeRef = useRef()
 
   const instances = useMemo(() => {
     const instances = [];
 
     for (let i = 0; i < count; i++) {
       instances.push({
         key: "instance_" + Math.random(),
         position: [Math.random() * 200, Math.random() * 200, Math.random() * 200],
         rotation: [Math.random(), Math.random(), Math.random()]
       });
     }
 
     return instances;
   }, []);
 
  return (

      <InstancedRigidBodies 
        ref={spikeRef} 
        instances={instances}
        colliders={false}
        position={[0, 10, 0]}
        colliderNodes={[
          <CuboidCollider args={[1, 1, 1]} position={[0, 0, 1]}/>,
          <CuboidCollider args={[0.5, 0.5, 0.8]} position={[0, 0, 0]}/>,
          <CuboidCollider args={[0.8, 0.5, 0.5]} position={[1, 0, 1]} />,
          <CuboidCollider args={[0.8, 0.5, 0.5]} position={[-1, 0, 1]} />,
          <CuboidCollider args={[0.5, 0.5, 0.8]} position={[0, 0, 2]} />,
          <CuboidCollider args={[0.5, 0.8, 0.5]} position={[0, 1, 1]} />,
          <CuboidCollider args={[0.5, 0.8, 0.5]} position={[0, -1, 1]} />,

        ]}
        >
          <instancedMesh frustumCulled={false} args={[undefined, undefined, count]} count={count} geometry={nodes.Core003.geometry} material={materials.spike_metal_material} />
        
      </InstancedRigidBodies>
  )
}

useGLTF.preload(process.env.PUBLIC_URL+'/static/Spike.glb')
