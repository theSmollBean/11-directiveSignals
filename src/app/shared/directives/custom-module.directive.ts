import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms'
@Directive({
  selector: '[customLabel]'
})
export class CustomModuleDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value:string ){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | undefined |null) {
    this._errors = value;
    console.log(value);
    this.setErrorMessage()
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('constructor de la directiva')
    console.log(el);
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'Hola mundo'
   }

  ngOnInit(): void {
    // console.log('Directiva - NgOnInit');
    this.setStyle();
    // console.log(this._color);
  }

  setStyle(): void{
    if (!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void{
    if( !this.htmlElement ) return;
    if( !this._errors ){
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);

    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if(errors.includes('minlength')){
      const min = this._errors ['minlength']['requiredLength']
      const actual = this._errors ['minlength']['actualLength']
      this.htmlElement.nativeElement.innerText = `Mínimo ${ min } caracteres / ${ actual } caracteres`;
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Es necesario un dominio email';
      return;
    }
  }
}
