import { Controller, Get, Redirect, Post, Delete } from '@nestjs/common';

// NOTE: it can be any kind of logic, just for demo
let recNum = 1;
function getRecommendations() {
  recNum += 1;

  if (recNum > 5) {
    return (recNum = 1);
  }

  return recNum < 5;
}

@Controller("users")
export class UsersController {
  // @Example 1: default status code for `POST` request is `201`
  @Post("profile")
  createProfile() {
    return { success: true };
  }

  // @Example 2: setting status code `200`
  @Post("email")
  @HttpCode(200)
  setEmail() {
    return { success: true };
  }

  // @Example 3: setting status code `200` with `HttpStatus` enum
  @Post("message")
  @HttpCode(HttpStatus.OK)
  setMessage() {
    return { message: "Be Happy" };
  }

  // @Example 4: setting status code `204` with `HttpStatus` enum
  @Delete("tags")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTags() {
    // NOTE: Because the status code is `204` hence no `response content` is sent to the client
    return "Tags Removed";
  }

  
  // ***********************
  // @Example 1: Redirect to `/users/netflix` route
  @Get("shows")
  @Redirect("netflix") // url, statusCode (default to 302)
  // @Redirect("netflix", 302)
  // @Redirect("netflix", 307)
  // @Redirect("/users/netflix", 302)
  getShow() {
    return { message: "I am not going to show" };
  }

  // redirection path
  @Get("netflix")
  redirectNetflix() {
    return {
      shows: ["Dark", "Sabrina"],
      message: "Netflix Redirect",
      isRedirectPath: true,
    };
  }

  // ****************************************** //

  // @Example 2: Dynamic Redirect
  // we need place the `@Redirect` decorator
  // then in request handler we must return an object with this fields {url, statusCode}
  @Get("recommendations")
  @Redirect()
  getRecommendations() {
    const areLatestArrivals = getRecommendations();

    if (areLatestArrivals) {
      return {
        url: "/users/latest-shows",
        statusCode: 302, // optional
      };
    } else {
      return {
        url: "netflix", // it is same as /users/netflix
      };
    }
  }

  // redirection path
  @Get("latest-shows")
  getLatestShows() {
    return {
      shows: ["Stanger Things 4", "Money Heist"],
      message: "Latest shows Redirect",
    };
  }
}
