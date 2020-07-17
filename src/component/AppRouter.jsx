import React from "react";
import { Route, Switch } from "react-router-dom";
import NewIDCard from "./File/NewIDCard";
import OldIDCard from "./File/OldIDCard";
import Passport from "./File/Passport";
import NewCDL from "./File/NewCDL";
import CameraNewIDCard from "./Camera/CameraNewIDCard";
import CameraOldIDCard from "./Camera/CameraOldIDCard";
import CameraNewCDL from "./Camera/CameraNewCDL";
import CameraPassport from "./Camera/CameraPassport";

function AppRouter() {
  return (
    <Switch>
      <Route path="/new-id-card">
        <NewIDCard />
      </Route>
      <Route path="/old-id-card">
        <OldIDCard />
      </Route>
      <Route path="/car-driver-license">
        <NewCDL />
      </Route>
      <Route path="/passport">
        <Passport />
      </Route>
      <Route path="/cam-new-id-card">
        <CameraNewIDCard />
      </Route>
      <Route path="/cam-old-id-card">
        <CameraOldIDCard />
      </Route>
      <Route path="/cam-new-car-driver-license">
        <CameraNewCDL />
      </Route>
      <Route path="/cam-passport">
        <CameraPassport />
      </Route>
    </Switch>
  );
}

const style = {
  marginTop: "20px",
};

export default AppRouter;
