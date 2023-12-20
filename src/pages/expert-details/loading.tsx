import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeleton() {
  return (
    <Card sx={{ minWidth: "90dvh", m: 4, mt: 0, minHeight: "90dvh" }}>
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={100} height={100} />}
        title={<Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={20} width="40%" />}
      />
      <Skeleton sx={{ height: 190, my: 5 }} animation="wave" variant="rectangular" />
      <Skeleton sx={{ height: 190, my: 5 }} animation="wave" variant="rectangular" />
      <Skeleton sx={{ height: 190, my: 5 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={15} width="80%" />
      </CardContent>
    </Card>
  );
}
