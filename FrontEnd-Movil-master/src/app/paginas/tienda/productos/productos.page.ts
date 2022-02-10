import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  public listaProductos: any[];
  total = 0;

  constructor(
    private _productoService: ProductoService,
    private ruta: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController
  ) {

  }

  ngOnInit() {
    this.obtenerProductos();
  }


  obtenerProductos() {
    const id = this.ruta.snapshot.paramMap.get('id')
    this._productoService.getProductos(id).subscribe(data => {
      this.listaProductos = data;
    });
  }

  async agregarAlCarrito(producto: any) {
    //para lo dinámico, se ocupa el camponull que se recibe de la api catProNavigation, y se lo almacena en cookie para trabajarlo

    var itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [];// agarrar carrito anterior

    for (let index in itemsCarrito) {
      if (producto.idPro == itemsCarrito[index].idPro) {
        //this.presentAlertMultipleButtons(itemsCarrito[index].catProNavigation);
        const alert = await this.alertController.create({
          header: ' ¿Desea reemplazarlo?',
          subHeader: 'Ya tiene ' + itemsCarrito[index].catProNavigation + ' unidades en el carrito.',
          message: 'Nueva cantidad: ' + producto.catProNavigation,
          buttons: [
            {
              text: 'No',
              role: 'No',
              cssClass: 'secondary',
              id: 'cancel-button',
            }, {
              text: 'Si',
              id: 'confirm-button',
              handler: async () => {
                itemsCarrito[index].catProNavigation = producto.catProNavigation;
                localStorage.setItem('carrito', JSON.stringify(itemsCarrito));
                const toast = await this.toastController.create({
                  message: "Se ha actualizado tu carrito",
                  duration: 2000
                });
                toast.present();
              }
            }
          ]
        });
        await alert.present();
        return;
      }
    }

    itemsCarrito.push(producto); //agrego
    localStorage.setItem('carrito', JSON.stringify(itemsCarrito));//actualizar cookies
    const toast = await this.toastController.create({
      message: "Se ha añadido a tu carrito",
      duration: 2000
    });
    toast.present();
  }



}
