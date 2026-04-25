// Author: Juan Pablo Avendaño y Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import { UserService } from '@services/UserService';

export class ServiceInitializer {
  static initialize(): void {
    void AuthService;
    void ComponentService;
    void ComputerService;
    void ComputerStatusHistoryService;
    void UserService;
  }
}
