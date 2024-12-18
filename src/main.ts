import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr , ToastrModule} from 'ngx-toastr';

const config = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      easeTime: 300, // Duración de la animación
      progressBar: true, // Barra de progreso opcional
      closeButton: true, // Botón de cierre
      preventDuplicates: true
    })
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));
