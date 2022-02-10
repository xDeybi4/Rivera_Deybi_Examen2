import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cantidad: number = 0;
  itemsCarrito: any;
  total = 0;
  cantItems = 0;
  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [] //agarrar carrito anterior del cookie
    this.CalculoTotal();
  }
  salirCarrito() {
    this.router.navigate(['/dashboard'])
  }

  addProduct(i: number) {
    this.itemsCarrito[i].catProNavigation = this.itemsCarrito[i].catProNavigation + 1;
    //Pushh a la cookie con los nuevos valores añadidos
    localStorage.setItem('carrito', JSON.stringify(this.itemsCarrito));//actualizar cookies

    this.CalculoTotal()
  }

  restProduct(i: number) {
    this.itemsCarrito[i].catProNavigation = this.itemsCarrito[i].catProNavigation - 1;
    //Pushh a la cookie con los nuevos valores restados
    localStorage.setItem('carrito', JSON.stringify(this.itemsCarrito));//actualizar cookies
    this.CalculoTotal();
  }

  CalculoTotal() {
    /* var listaCarrito = [];
    listaCarrito.push(JSON.parse(localStorage.getItem('carrito'))); */
    this.total = 0;
    var contador = 0;
    for (let i of this.itemsCarrito) {
      this.total += (i.puPro * i.catProNavigation)
      contador += 1
    }
    this.cantItems = contador;
  }

  async eliminar(index: number) {
    this.itemsCarrito.splice(index, 1)
    //push al cookie
    localStorage.setItem('carrito', JSON.stringify(this.itemsCarrito));//actualizar cookies
    this.cargarCarrito();
    this.makeText("Se ha retirado el producto.")
  }

  facturar() {
    this.router.navigate(['/carrito/factura'])
  }
  async makeText(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  vaciar(){
    this.makeText("El carrito se ha vaciado.");
    localStorage.removeItem('carrito');
    this.cargarCarrito();
  }

  /*
  import { ToastController } from '@ionic/angular';

  public toastController: ToastController,

  const toast = await this.toastController.create({
      message: "Se ha retirado de tu carrito",
      duration: 2000
    });
    toast.present();
  
  
  
  */


  //import { AlertController } from '@ionic/angular';
  //
  //public alertController: AlertController
  //
  // async pagar(){
  //   const alert = await this.alertController.create({
  //     header: ' ¿Desea reemplazarlo?',
  //     subHeader: 'Ya tiene ' ,
  //     message: 'Nueva cantidad: ' ,
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'No',
  //         cssClass: 'secondary',
  //         id: 'cancel-button',
  //       }, {
  //         text: 'Si',
  //         id: 'confirm-button',
  //         handler:  () => {

  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

}
