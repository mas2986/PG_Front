# Mini-guia work flow con git
Todo esto es un resumen recomendado segun el rejunte de todo lo que vi de git y el flow de trabajo, como es medio trambolico, para que laburemos mejor y no perdamos tiempo buscando o preguntando lo que si o si necesitamos usar, sientanse libres de agregar, modificar o sugerir algo
Es mucho muy importante que a parte de usar bien git y github nos estemos comunicando constantemente para estar al tanto de que hace cada uno
Tambien es importante no trabajar de mas de a 1 en el mismo archivo, a lo sumo juntarse con otro por meet o llamada y que uno vaya haciendo los cambios en una sola rama.

## Comandos utiles GIT

- ver rama en la que estoy: git branch
- crear rama local: git branch {nombre de la rama}
- moverse entre ramas locales: git checkout {nombre de la rama}
- crear una rama local y moverse a ella: git checkout -b {nombre de la rama}
- borrar rama local: git branch -d {nombre de la rama local}
- borrar rama remota: git push origin --delete {nombre de la rama remota}
- actualizar el repo local con lo que hay en el remoto: git pull (git pull !== pull request)
- interfaz visual de git para ver las ramas: gitk
- interfaz en consola para ver las ramas: git log --oneline --graph
- pushear cambios: git push origin {nombre de la rama} (indicar el nombre de la rama para asegurarse que pusheamos a esa rama)
- si le erraron en usar la misma rama local que la del repo remoto: git push origin localBranchName:remoteBranchName


## Branches

Vamos a trabajar con 2 ramas básicas, más las que vayamos necesitando para agregar features, correcciones, etc
Las ramas principales son:
- Main: Esta va a ser la rama estable porlas lleguemos a romper o pase algo, no se debe hacer el pull request a esta rama
- Prueba: Esta va a ser la rama staging, de produccion, donde vamos a ir haciendo pull request y mergeando todo lo que vayamos haciendo. Y cada tanto vamos a pasar estos cambios a la main asegurandonos de que sea estable lo que tenemos.

Luego vamos a creando ramas descriptivas cada vez que vayamos a trabajar en algo. 
Por descriptivas es por ej:
- feat/user_creation
- fix/currency_with_decimal 
- chore/lint_ci 
- refactor/auth_routing.  
Es importante que nos comuniquemos cuando vayamos a hacer algo asi no pasa que otro se ponga a trabajar y modificar los mismos archivos que estamos trabajando, y no generamos conflictos
Y tambien es importante limitar la rama a algo chico, lo que vamos a hacer ese dia o en ese momento, por ej no hacer una rama para configurar todo el server, asi todos vamos teniendo todo actualizado


## Flow de trabajo

### Pull

Al empezar hacer git pull desde la rama local prueba asi los archivos actualizados del repo remoto los tenemos localmente en esa rama (en prueba local asi no sucede de tener en main o en una rama local lo que es prueba del remoto y es mas facil guiarse)
git pull origin prueba
En la consola de git bash sale la rama en la que estas parado entre parentesis, o con git branch  
/d/Repositorios/Pruebas/pruebasgit (main)


### Trabajo local

Crear una rama local con git branch {nombre de la rama}, o git checkout -b {nombre de la rama} para crearla y moverse a esa rama en un solo comando
Es recomendable hacer un commit por cada cosa o correccion pequeña separada que se vaya agregando, para no perder todo el laburo de esa rama si algo entra en conflicto. Si tienen que tocar varias secciones, consideren hacerlo en distintos Pull Requests (copypasteado esto)
Para facilitar el tema de los commits y no ir agregando los archivos con comando (sugerencia no usar git add . por las dudas modifiquemos sin querer otros archivos que no son los que queremos trabajar), en vsc en la parte izquierda en source control van a ir apareciendo los archivos que se crean o modifican con un +.
Ese + hace el git add de ese archivo.
Luego seguiria hacer el commit con git commit -m 'mensaje' o poner el msj ahi en el input en source control y darle al tic
Algunos ejemplos posibles de commits: 
- feat(api/players route): add endpoint GET /players/:id 
- refactor(client/dashboard): date logic for product expirations 
- fix(api/users controller): return 404 on inexistent user 
- test(api/math): add missing tests for division by zero  
Una vez terminado todo el laburo de la rama recien ahi el push git push origin {nombre de la rama}
Es importante marcarle el nombre de la rama porque hasta el momento la rama que hicimos existe solo en el repo local, y si no se lo marcamos creo que toma la default del repo remoto y lo hace a esa
Todo esto siempre parado en la rama local que corresponde al laburo que queremos hacer, no en main o prueba


### Pull request

Luego de pusheada la rama y creada en el repo remoto va a aparecer en el repo en github la opcion para hacer la comparacion y el pull request, con el nombre de la rama creada
Entras en compare and pull request y muuuuuy importante que la comparacion sea con la rama prueba, no main  
base: prueba <- compare: rama que creamos  
Creamos un mensaje con lo que hicimos para que otro sepa que se hizo y pueda hacer mejor el code review  
Si es front recomendable agregar capturas con los cambios en la UI.  
A la derecha elegir en reviewers 1 code reviewer (o 2 si son cambios grandes o no estamos seguros) random (para que no sea uno solo el que controle y estemos todos mas al tanto de toda la app) del team que es (front o back)  
Esto crea la pull request y ahi debereriamos avisarle al o los code reviewers que elegimos que ya esta listo el pull request para que lo revise


### Code review

En la parte de pull requests salen los PRs activos
El code reviewer puede:
- Aprobar el pull request
- Dejar algun comentario a modo de sugerencia pero sin rechazar el pull request
- Rechazar el pull request porque si o si necesita correcciones lo hecho

En la parte de files changed va a salir una comparacion con los archivos que fueron cambiados, que lineas de codigo fueron borradas en rojo, y que lineas de codigo fueron agregadas en verde.
A parte del mensaje en si del PR, en la misma linea del codigo se puede hacer comentarios con lo que creen que esta mal o la sugerencia


### Pull request aprobado

Si la configuracion de github lo permite (no lo se aun si esta bien configurado para que cualquiera pueda, de ultima avisar para que el own repository lo haga)
El autor de la rama mergea los cambios aprobados de su rama a la rama prueba.
Para que no tengamos 70 ramas, completado esto borrar la rama que creamos para trabajar del repo local, y la misma rama del repo remoto
- git branch -d {nombre de la rama local}
- git push origin --delete {nombre de la rama remota}


Y de nuevo se repite el ciclo, eat sleep code repeat. **Maiameeeee**
