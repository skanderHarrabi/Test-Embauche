<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
  'prefix' => 'auth'
], function () {
  Route::post('signin', 'AuthController@signin');
  Route::post('signup', 'AuthController@signup');
  Route::group([
    'middleware' => 'auth:api',
  ], function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
  });
});
Route::resource("users", "UserController");
Route::get("products",'Api\ProductsController@index');
Route::post("order",'Api\OrdersController@store');
Route::post("product",'Api\ProductsController@store');
Route::post("category",'Api\CategoriesController@store');
Route::get("categories",'Api\CategoriesController@index');
Route::get("productsbycategory/{id}",'Api\ProductsController@productsforcat');
