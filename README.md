# SCML - Structured C Markup Language #
## 1. Introducción ##

<p align="center">
<img src="https://raw.githubusercontent.com/alu0100699494/SCML/master/public/images/favicon.png" title="Logo SCML">
</p>

**SCML** es un [**lenguaje de marcado**](http://es.wikipedia.org/wiki/Lenguaje_de_marcado) que permite la codificación de páginas web. Su diseño gramatical similar a los **lenguajes de programación estructurada** _(como [C](http://es.wikipedia.org/wiki/C))_, permite la escritura de páginas web empleando una sintaxis intuitiva, y visualmente bien estructurada; intentando alejarse de la tradicional representación de las etiquetas de [**HTML**](http://es.wikipedia.org/wiki/HTML).
```ruby
/* Hola Mundo en SCML */
@head {
  @title { Hola Mundo SCML }
  @meta (charset: "ISO-8859-1");
}
Hola Mundo
```
Se ha creado SCML con la idea no sólo de facilitar el aprendizaje en cuanto a la elaboración de páginas web se refiere _(proporcionando una aplicación de traducción automática de SCML a HTML)_, sino también la de ofrecer una **alternativa** cómoda e intuitiva para todos aquellos usuarios acostumbrados a emplear lenguajes de programación estructurados u orientados a objetos basados en C.

> Para la información acerca de la utilización y sintaxis del lenguaje, acceder a la [[Sintaxis de SCML]]

## 2. Acceso a la página web ##
Se puede acceder a la página web desde el siguiente enlace:

- Despliegue en Heroku: [http://scml.herokuapp.com/](http://scml.herokuapp.com/)

## 3. Dependencias ##
Se ha hecho uso de la librerías y dependencias siguientes:

- [PEG.js](http://pegjs.majda.cz/): Analizador léxico y sintáctico.
- [CodeMirror](http://codemirror.net/): Editores de texto.
- [Metro UI CSS](http://metroui.org.ua/): Estilo Metro CSS.
- [MathJax](http://docs.mathjax.org/en/latest/start.html): Gramática y fórmulas matemáticas.
- [jQuery](http://jquery.com/)
- [Ruby](https://www.ruby-lang.org/es/) y [Ruby/Sinatra](http://www.sinatrarb.com/): Gestión del servidor.

## 4. Reparto del trabajo ##

El reparto del trabajo se ha realizado de la siguiente manera:

### Conjunto ###
- Diseño de la gramática.
- Implementación de la gramática con *PEG.js*.

### Sergio ###
- Análisis semántico y generación de código.
- Arreglos de fallos de la gramática.

### Cristo ###
- Documentación de la wiki.
- Pruebas *Mocha/Chai*.
- Creación de ejemplo SCML.

### Daniel ###
- Creación de página principal.
- Despliegue en Heroku.
- Analizador léxico para *CodeMirror*.

## 5. Autores ##
Este proyecto ha sido desarrollado, en conjunto, por:

<!-- Tabla -->
<table cellspacing="0">
  <tr  style="background-color: #E3E3E3;">
    <td> <b>Nombre</b> </td>
    <td> <b>Usuario</b> </td>
	<td> <b>Correo electrónico</b> </td>
  </tr>
  <tr style="background-color: #FFFFFF;">
    <td> Sergio Manuel Afonso Fumero </td>
    <td> alu0100700459 </td>
	<td> <a href="mailto:alu0100700459@ull.edu.es">alu0100700459@ull.edu.es</a> </td>
  </tr>
  <tr style="background-color: #FFFFFF;">
    <td> Cristo González Rodríguez </td>
    <td> alu0100694987, Shylpx</td>
	<td> <a href="mailto:alu0100694987@ull.edu.es">alu0100694987@ull.edu.es</a> </td>
  </tr>
  <tr style="background-color: #FFFFFF;">
    <td> Daniel Herzog Cruz </td>
    <td> alu0100699494 </td>
	<td> <a href="mailto:alu0100699494@ull.edu.es">alu0100699494@ull.edu.es</a> </td>
  </tr>

</table>
<!-- Fin tabla -->
