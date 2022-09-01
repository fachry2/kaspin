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
4. migrasi seluruh tabel
```js
adonis migration:run
```
5. insert data user seed
```js
adonis seed
```
6. jalankan test
```js
adonis test
```
7. jalankan server
```js
adonis serve
```

documentation postman collection: https://documenter.getpostman.com/view/2272643/UzJESeXS#dokumentasi-untuk-menjalankan-server 
