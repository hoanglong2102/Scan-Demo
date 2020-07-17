import React from "react";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import NavBar from "./Navbar";

function Menu() {
  const [value, setValue] = React.useState("NewIDCard");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let history = useHistory();

  function handleClick1() {
    history.push("/new-id-card");
  }

  function handleClick2() {
    history.push("/old-id-card");
  }

  function handleClick3() {
    history.push("/car-driver-license");
  }

  function handleClick5() {
    history.push("/passport");
  }

  return (
    <div class="wrapper">
      <div class="sidebar">
        <FormControl component="fieldset">
          <h3 className="categories">React Scan</h3>
          <RadioGroup
            aria-label="categories"
            name="categories"
            value={value}
            onChange={handleChange}
          >
            <ul>
              <li>
                <FormControlLabel
                  value="NewIDCard"
                  control={<Radio />}
                  label="New ID Card"
                  onClick={handleClick1}
                />
              </li>
              <li>
                <FormControlLabel
                  value="OldIDCard"
                  control={<Radio />}
                  label="Old ID Card"
                  onClick={handleClick2}
                />
              </li>
              <li>
                <FormControlLabel
                  value="CarDriverLicense"
                  control={<Radio />}
                  label="Car Driver License"
                  onClick={handleClick3}
                />
              </li>
              <li>
                <FormControlLabel
                  value="Passport"
                  control={<Radio />}
                  label="Passport"
                  onClick={handleClick5}
                />
              </li>
            </ul>
          </RadioGroup>
        </FormControl>
      </div>
      <NavBar />
    </div>
  );
}

export default Menu;
