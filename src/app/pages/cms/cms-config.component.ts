import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiKeyService } from '@services/api-key.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cms',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <h5 class="text-500 float-end">Api Key</h5>
          </div>
          <div class="card-body">
            <div>
              <p-button
                type="button"
                size="small"
                [outlined]="true"
                severity="info"
                [loading]="apikeyService.loading()"
                (click)="generateApiKey()"
              >
                Generar Key
              </p-button>
            </div>
            <div class="flex flex-column mt-3">
              <div>
                <span>Client: </span> <span>{{ apikeyService.apikey().client }}</span>
              </div>
              <div>
                <span>Secret: </span> <span>{{ apikeyService.apikey().secret }}</span>
              </div>
              <div>
                <span>Key: </span> <span>{{ apikeyService.apikey().apikey }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CmsConfigComponent {
  constructor(public apikeyService: ApiKeyService) {}

  ngOnInit(): void {
    this.apikeyService.getApiKey();
  }

  generateApiKey() {
    this.apikeyService.postApiKey();
  }
}
