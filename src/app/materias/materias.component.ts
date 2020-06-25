import { Component, OnInit } from '@angular/core';
import { Materias } from '../materias'
import { MateriasService } from '../materias.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  Titulo = "Materias"
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; 
  
  submitted = false;

  Items: Materias[] = [];
  FormReg: FormGroup;

  constructor(private materiasService:  MateriasService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.GetMaterias();

    this.FormReg = this.formBuilder.group({
      IdMateria: [0],

      MateriaAnio: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],

      MateriaNombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
    });
  }
  GetMaterias() {
    this.materiasService.get()
    .subscribe((res:Materias[]) => {
      this.Items = res;
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    //this.FormReg.reset(this.FormReg.value);
    this.FormReg.reset();
    //this.FormReg.controls['IdEmpresa'].setValue(0);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Cancelar() {
    this.AccionABMC = "L";
    this.submitted = false;

    this.GetMaterias();
  }
  Grabar() {

    this.submitted = true;

    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      window.alert("Revisar Datos");
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    // var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("/");
    // if (arrFecha.length == 3)
    //   itemCopy.FechaFundacion = 
    //       new Date(
    //         arrFecha[2],
    //         arrFecha[1] - 1,
    //         arrFecha[0]
    //       ).toISOString();

    // agregar post
    if (itemCopy.IdMateria == 0 || itemCopy.IdMateria == null) {
      itemCopy.IdMateria = 0;
      console.log(itemCopy);
      this.materiasService.post(itemCopy).subscribe((res: any) => {

        this.Cancelar();
        window.alert("Registro grabado");
        // this.modalDialogService.Alert('Registro agregado correctamente.');
        // this.Buscar();
      });
    } else {
      // modificar put
      this.materiasService
        .put(itemCopy.IdMateria, itemCopy)
        .subscribe((res: any) => {
          this.Cancelar();
          window.alert("Registro modificado");
        });
    }
    //this.GetMaterias();
  }

}