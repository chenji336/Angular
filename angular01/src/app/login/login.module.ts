import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { PlaygroundComponent } from './playground/playground.component';
import { CoreModule } from '../core/core.module'

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ],
    declarations: [
        LoginComponent,
        RegisterDialogComponent,
        PlaygroundComponent
    ],
    // entryComponents: [RegisterDialogComponent,PlaygroundComponent],
    // exports: [LoginComponent, PlaygroundComponent],
    providers: []
})
export class LoginModule { }
