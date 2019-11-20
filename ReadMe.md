Để start project:
- Điều kiện tiên quyết: có gói npm
- Chạy các scripts sau:
+. Scripts tạo database
+. npm install : tạo package-log.json
+. npm install - express
+. npm install --save express-handlebars sequelize : để tạo node_modules 
+. Tùy theo máy mà config db Dev khác nhau => nên thêm dòng vào .gitignore để không ignore file config evironment database,host lên git. Ví dụ nên ignore db fileDir = configs/config.js => thêm vào .gitignore dòng configs/config.js