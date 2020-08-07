## Clone the project to a location you choose then cd to that project and run there commands :

1. Copy the .env.example file and change his name to .env
Then edit your .env file with DB credentials and other settings.

2. Run composer install command

3. Run php artisan migrate and if you have a default data to insert to DB just add --seed option.
 
4. Run php artisan passport:install to generate Clients

5. Run php artisan key:generate command.

6. Run php artisan storage:link command

7. Run npm install --global cross-env

8. Run npm install --no-bin-links

9. Run npm run dev or npm run watch to compile the react code

10. Finally Run php artisan serve and visit localhost:8000 
