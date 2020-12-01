import { AuthGuardService } from './auth-guard.service';
import { TestBed } from '@angular/core/testing';

describe('AuthGuardService', () => {

  let service: AuthGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService
      ]
    });
    service = TestBed.get(AuthGuardService);

  });

  it('should be able to create service instance', () => {
    expect(service).toBeDefined();
  });

});
