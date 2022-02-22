import { Request } from 'express';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';

interface RequestWithUser extends Request {
  adminUser: AdminUser;
}

export default RequestWithUser;
