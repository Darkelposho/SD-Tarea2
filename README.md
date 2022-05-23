# SD-Tarea2
# Instrucciones de uso
1. Descargar e instalar archivos del repositorio usando el siguiente comando:
```bash
git clone https://github.com/Darkelposho/SD-Tarea2.git
```
2. Escribir en la terminal ```Docker-compose up```
3. Abrir Postman o algun software diseñado en consultas API.
4. Usar la dirección `localhost:3000/login`
5. Escribir una consulta post con variable usario y contraseña.
(Ejemplo)  
```bash
{
    "username":"Juan",
    "password":"El loco Juan"
}
```
6. Si se realiza 5 veces este comando con el mismo usario en menos de un 1 minutos se bloquea.
7. Se puede ver si el usuario fue bloqueado en la dirección `localhost:8000/blocked`
----
**Preguntas**
----
- ¿Por qué Kafka funciona bien en este escenario?
- Basado en las tecnologías que usted tiene a su disposición  (Kafka, backend) ¿Qué haría usted para manejar una gran cantidad de usuarios al mismo tiempo?
---
