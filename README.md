# Proyecto-LPWWW-202502  

## Recursos  
- **Diseño en Figma** [Ver aquí](https://www.figma.com/design/1jW0bbqzEnghEEiTB3Hj3I/P%C3%A1gina-Web-Fukusuke?node-id=0-1&t=F5y3Ws43I2ALGzC3-1)  
- **Video de presentación** [Ver aquí](https://youtu.be/Q1LeVbsQqNY)  


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

## Endpoints
Para probar los endpoints de fastapi, entrar en [localhost:8000/docs](http://localhost:8000/docs)
