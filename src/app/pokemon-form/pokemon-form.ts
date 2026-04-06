import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { Pokemon } from '../pokemon';
@Component({
  selector: 'app-pokemon-form',
  imports: [],
  templateUrl: './pokemon-form.html',
  styleUrl: './pokemon-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
type: ['', Validators.required],
level: ['', Validators.required, Validators.min(1)],
nature: ['', Validators.required],
  } )
pokemonService = inject(Pokemon);
  ngOnInit(){
this.pokemonService.fetchPokemon();
  }
  onSubmit(){
 if(this.pokemonForm.valid) return;

 const data = this.pokemonForm.getRawValue();
 this.pokemonService.savePokemon(data).subscribe({
  next:() => {
    this.pokemonService.fetchPokemon();
    this.pokemonForm.reset();
  },
  error: (err) => console.error("Save Failed", err)
 });

  }
}
