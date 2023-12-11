import { Box, Grid, Typography } from "@mui/material";

function Noitems({ title, icon }: any) {
  return (
    <Box minHeight={520} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Grid
        xs={12}
        className="no-orders"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "128px",
            height: "128px",
            lineHeight: "165px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: "50%",
            margin: "auto",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.85 }}>
          {title}
        </Typography>
      </Grid>
    </Box>
  );
}

export default Noitems;
