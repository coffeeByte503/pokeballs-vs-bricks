#Este codigo solo se puede probar en computadora
#Debes instalar python y pygame
#Para instalar pygame ve a la terminal
#Y escribes pip install pygame
#Y listo
#Debes tener un editor de codigo para probar este codigo ya que en sololearn no tiene pygame instalado
"""Para ir a la terminal presiona windows + r"""


#Autor:Angel Alberto

#----Pygame----

import pygame #Importo pygame
import sys


#Inicializo pygame
pygame.init()

#Variables que van a tener las medidas de mi ventana
width = 900
height = 900

#Mi ventana
surface = pygame.display.set_mode((width,height))
#Titulo
pygame.display.set_caption("Mover imagen con mouse")

"""Debes salavr una imagen como
Despues lo guardas en una carpeta por ejemplo yo lo que hice
es guardar una imagen llamada Circle.png en una carpeta llamada Pygame-course."""

#Color
white = (255,255,255)

#Imagen de ejemplo
imagen = pygame.image.load("graphics/1.png") #Cargo mi imagen
#Traigo mi rectangulo
rect = imagen.get_rect()

#Bucle para quitar la ventana
while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    #Creo mi variable que va a contener la posicion del mouse
    rect.center = pygame.mouse.get_pos()
    
    
    
    
    #Le agrego color a mi ventana
    surface.fill(white)
    
    
    surface.blit(imagen,rect)
    
    #Actualizo mi ventana
    pygame.display.update()
    







#----Pygame----



#Gracias por ver
#Este codigo es de todos :)
#Mientras hagan modificaciones mejor para que asi quede un potente codigo