// Deno includes a test runner out of the box:
// 1. There is a test runner in the CLI
// 2. Assertions in the STL
// 3. Built in test driven fixtures with Deno.test()

import {
    assertEquals,
  } from "../test_deps.ts";

import { filterHabitablePlanets } from "./planets.ts";

// Some fakes
const HABITABLE_PLANET = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1",
    koi_smass: "1",
  };
  
  const NOT_CONFIRMED = {
    koi_disposition: "FALSE POSITIVE",
  };
  
  const TOO_LARGE_PLANETARY_RADIUS = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1.5",
    koi_srad: "1",
    koi_smass: "1",
  };
  
  const TOO_LARGE_SOLAR_RADIUS = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1.02",
    koi_smass: "1",
  };
  
  const TOO_LARGE_SOLAR_MASS = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1",
    koi_smass: "1.04",
  };
  
// Short version
Deno.test("filter only habitable planets", () => {
    const filtered = filterHabitablePlanets([
      HABITABLE_PLANET,
      NOT_CONFIRMED,
      TOO_LARGE_PLANETARY_RADIUS,
      TOO_LARGE_SOLAR_RADIUS,
      TOO_LARGE_SOLAR_MASS,
    ]);
  
    assertEquals(filtered, [
      HABITABLE_PLANET,
    ]);
  });


// Verbose Example of Tests , allows for more params
Deno.test({
  name: "Test Name",
  ignore: Deno.build.os == "darwin", // windows , linux 
  fn(){
      console.log("Hello from the tests.")
  }
})

Deno.test({
  name: "Resource leak test",
  sanitizeResources: false, //If you want to ignore resource leaks
  async fn(){
      // We open but never close the file.
      const file = await Deno.open("./planets.test.ts");
  }
})