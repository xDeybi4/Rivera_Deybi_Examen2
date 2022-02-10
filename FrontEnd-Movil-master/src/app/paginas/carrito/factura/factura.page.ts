import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/interfaces/factura';
import { Detalle } from 'src/app/interfaces/detalle';
import { Router } from '@angular/router';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  cookieAuth: any;
  cliente: any;
  itemsCarrito: any;
  total = 0;
  listaDetalle: any[] = [];
  detalle: Detalle;

  constructor(
    private router: Router,
    private _loginService: LoginService,
    public alertController: AlertController,
    private _facturaService: FacturaService,
    public toastController: ToastController,
  ) {
    this.cookieAuth = _loginService.UsuarioData;

  }

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [] //agarrar carrito anterior del cookie
    this.calculoTotal();
  }

  calculoTotal() {
    /* var listaCarrito = [];
    listaCarrito.push(JSON.parse(localStorage.getItem('carrito'))); */
    this.total = 0;
    for (let i of this.itemsCarrito) {
      this.total += (i.puPro * i.catProNavigation)
    }
  }

  async pagar() {
    const alert = await this.alertController.create({
      header: ' ¿Finalizar compra?',
      subHeader: '',
      message: 'Esta acción es irreversible.',
      buttons: [
        {
          text: 'No',
          role: 'No',
          cssClass: 'secondary',
          id: 'cancel-button',
        }, {
          text: 'Si',
          id: 'confirm-button',
          handler: () => {
            this.guardarFactura();
          }
        }
      ]
    });
    await alert.present();
  }


  guardarFactura() {
    for (let data of this.itemsCarrito) {
      this.detalle = {
        idPro: data.idPro,
        cant: data.catProNavigation,
        pu: data.puPro,
        idProNavigation: {
          idPro: data.idPro,
          nomPro: data.nomPro,
          stockPro: data.stockPro,
          puPro: data.puPro,
          catPro: data.catPro,
          imgPro: data.imgPro,
          estPro: data.estPro
        }
      }
      data.catProNavigation = null
      this.listaDetalle.push(this.detalle);
    }


    const factura: Factura = {
      total: this.total,
      idCli: this.cookieAuth.usuario.idCli,
      idCliNavigation: this.cliente,
      detalleFacturas: this.listaDetalle
    }

    this._facturaService.postFactura(factura).subscribe(data => {
      this.makeText("Compra realizada con éxito");
      localStorage.removeItem('carrito');
      this.salir();
    }, error => {
      this.makeText("Lo siento, hubo un error en la transacción.");
    });

  }


  async makeText(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  salir() {
    
    this.router.navigate(['/dashboard/tienda']);
    
    
  }
}
