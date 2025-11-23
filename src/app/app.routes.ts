import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { AllDrawingsComponent } from './pages/all-drawings/all-drawings.component';
import { CreateOrUpdateSignalFormComponent } from './pages/create-or-update-signal-form/create-or-update-signal-form.component';

export const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: '',
                component: AllDrawingsComponent
            },
            {
                path: 'create-or-update-drawing/:id',
                component: CreateOrUpdateSignalFormComponent
            }
        ]
    }
];
