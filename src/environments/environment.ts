// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  imageServerUrl: "http://localhost:3000/uploads",
  url: {
      "Login": "/user/login",
      "GetAllUsers": "/user/getAllUsers",
      "CreateUser": "/user/createUser",
      "DeleteUser": "/user/deleteUser",
      "EditUser": "/user/updateUser/",

      "GetAllServices": "/service/getAllServices",
      "AddService": "/service/createService",
      "DeleteService": "/service/deleteService",
      "EditService": "/service/updateService/",

      "GetAllCategories": "/category/getAllCategories",
      "AddServiceCategory": "/category/createCategory",
      "EditServiceCategory": "/category/updateCategory/",
      "DeleteServiceCategory": "/category/deleteCategory",

      "GetAllReviews": "/review/getAllReviews",

      "GetAllBookings": "/booking/getAllBookings",

      "GetAllLanguages": "/language/getAllLanguages",
      "AddLanguage": "/language/createLanguage",
      "EditLanguage": "/language/updateLanguage/",
      "DeleteLanguage": "/language/deleteLanguage",

      "GetAllStates": "/state/getAllStates",

      "GetAllDistricts": "/district/getAllDistricts",

      "GetAllLocations": "/location/getAllLocations",
      "AddLocation": "/location/createLocation",
      "EditLocation": "/location/updateLocation/",
      "DeleteLocation": "/location/deleteLocation",

      "GetAllPackages": "/packages/getAllPackages",
      "AddPackage": "/packages/createPackage",
      "EditPackage": "/packages/updatePackage/",
      "DeletePackage": "/packages/deletePackage",

      "GetAllCommunities": "/community/getAllCommunities",
      "AddCommunity": "/community/createCommunity",
      "EditCommunity": "/community/updateCommunity/",
      "DeleteCommunity": "/community/deleteCommunity",

      "GetAllInclusions": "/inclusions/getAllInclusions",
      "AddInclusion": "/inclusions/createInclusion",
      "EditInclusion": "/inclusions/updateInclusion/",
      "DeleteInclusion": "/inclusions/deleteInclusion",

      "GetAllVathiyars": "/vathiyar/getAllVathiyars",
      "AddVathiyar": "/vathiyar/createVathiyar",   
      "EditVathiyar": "/vathiyar/updateVathiyar/",   
      "DeleteVathiyar": "/vathiyar/deleteVathiyar",

      "UploadProfileImg": "/vathiyar/uploadProfileImg",
      "UploadAadharImg": "/vathiyar/uploadAadharImg",
      
      "GetAllAccountTypes": "/account/getAllAccountTypes",

      "uploadServiceImg": "/uploads"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
