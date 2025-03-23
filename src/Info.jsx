import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function Info({ info }) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-semibold text-sky-800 mb-3">
          {info.temperature}&deg;C
        </h1>
        <div>
          <p className="text-4xl font-semibold text-teal-900 capitalize text-center">
          <i class="ri-map-pin-2-fill"></i>{info.currCity}
          </p>
          <p className="text-2xl font-semibold text-teal-900 capitalize text-center">
          <i class="ri-mist-fill"></i>{info.weatherDes}
          </p>
        </div>

        <Card sx={{ minWidth: 320 }}>
          {/* <CardMedia
            sx={{ height: 120 }}
            image={initialImgURL}
            title="green iguana"
          /> */}
          <CardContent>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              component={"span"}
            >
              <div className="flex flex-wrap justify-evenly gap-4">
                <span className="text-3xl font-bold flex items-center justify-evenly py-5 flex-col h-35 w-31 bg-teal-100 rounded-3xl text-gray-800 shadow-lg">
                  <i class="ri-water-percent-fill"></i>
                  <p>{info.humidity}</p>
                </span>
                <span className="text-3xl font-bold flex items-center justify-evenly py-5 flex-col h-35 w-31 bg-teal-100 rounded-3xl text-gray-800 shadow-lg">
                  <i class="ri-arrow-down-double-fill"></i>
                  <p>{info.tempMin}&deg;C</p>
                </span>
                <span className="text-3xl font-bold flex items-center justify-evenly py-5 flex-col h-35 w-31 bg-teal-100 rounded-3xl text-gray-800 shadow-lg">
                  <i class="ri-arrow-up-double-fill"></i>
                  <p>{info.tempMax}&deg;C</p>
                </span>
                <span className="text-xl font-bold flex items-center justify-evenly py-5 flex-col h-35 w-31 bg-teal-100 rounded-3xl text-gray-800 shadow-lg">
                  <h4>Feels Like</h4>
                  <p className="text-3xl">{info.feelsLike}&deg;C</p>
                </span>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Info;
