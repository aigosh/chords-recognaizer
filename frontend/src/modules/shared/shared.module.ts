import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';
import { SharedMetaModule } from './shared-meta';

@NgModule({
  exports: [SharedMetaModule, TransferHttpModule],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
