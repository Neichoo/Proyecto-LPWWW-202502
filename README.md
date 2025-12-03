# Proyecto-LPWWW-202502  

## Recursos 
### Primera Entrega: Front
- - **Diseño en Figma** [Ver aquí](https://www.figma.com/design/1jW0bbqzEnghEEiTB3Hj3I/P%C3%A1gina-Web-Fukusuke?node-id=0-1&t=F5y3Ws43I2ALGzC3-1)  
- - **Video de presentación** [Ver aquí](https://youtu.be/Q1LeVbsQqNY)
### Segunda Entrega: Back
- - **API Contract** [Ver aquí](https://github.com/Neichoo/Proyecto-LPWWW-202502/wiki/Api-Contract)
- - **Diagrama de Clases [Ver aquí](https://github.com/Neichoo/Proyecto-LPWWW-202502/wiki/Diagrama-de-Clases)**
- - **Diagrama de Componentes [Ver aquí](https://github.com/Neichoo/Proyecto-LPWWW-202502/wiki/Diagrama-de-Componentes)**
- - **Video de presentación** [Ver aquí](https://youtu.be/kBMc-OtHQiI)


# Buildear y levantar

1. Levantar la bd
    ```
    docker-compose up --build db -d
    ```

2. Levantar la fastapi
    ```
    docker-compose up --build fastapi -d
    ```

3. Tambien se puede levantar todo (si ya se buildeó almenos 1 vez) con
    ```
    docker-compose up --build
    ```

4. Para levantar el Frontend se deben realizar los siguientes comandos
    ```
    cd Frontend
    npm install
    npm run dev
    ```

## Direccion Pagina
Para entrar a la pagina debe entrar en [localhost:5173](http://localhost:5173)

## Endpoints
Para probar los endpoints de fastapi, entrar en [localhost:8000/docs](http://localhost:8000/docs)
