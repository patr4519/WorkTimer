import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={213}
    viewBox="0 0 250 213"
    backgroundColor="#e1e0e0"
    foregroundColor="#636363"
    {...props}
  >
    <rect x="0" y="257" rx="5" ry="5" width="220" height="15" /> 
    <rect x="0" y="278" rx="5" ry="5" width="220" height="15" /> 
    <rect x="20" y="298" rx="5" ry="5" width="180" height="15" /> 
    <rect x="30" y="0" rx="10" ry="10" width="190" height="38" /> 
    <rect x="60" y="44" rx="10" ry="10" width="130" height="38" /> 
    <rect x="25" y="87" rx="0" ry="0" width="200" height="38" /> 
    <rect x="25" y="129" rx="0" ry="0" width="200" height="38" /> 
    <rect x="25" y="172" rx="0" ry="0" width="200" height="38" />
  </ContentLoader>
)

export default Skeleton

