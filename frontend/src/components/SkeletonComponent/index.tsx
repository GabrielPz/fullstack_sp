import {Skeleton} from "@mui/material";

export default function SkeletonComponent() {

  return (
    <>
        <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
        <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
        <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
    </>
  );
}
