import { Request } from 'express';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';

interface RequestWithAdminUser extends Request {
  adminUser: AdminUser;
}

export default RequestWithAdminUser;
