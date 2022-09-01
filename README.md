# Cara menjalankan
1. clone project
2. masuk ke folder
```bash
cd kaspin
```
3. install dependensi
```js
npm install --omit=dev
```
4. copy atau save as file .env-example menjadi .env dan generate key
```bash
cp .env.example .env

adonis key:generate
```
5. migrasi seluruh tabel
```js
adonis migration:run
```
6. insert data user seed
```js
adonis seed
```
7. jalankan test
```js
adonis test
```
8. jalankan server
```js
adonis serve
```

documentation postman collection: https://documenter.getpostman.com/view/2272643/UzJESeXS#dokumentasi-untuk-menjalankan-server 
