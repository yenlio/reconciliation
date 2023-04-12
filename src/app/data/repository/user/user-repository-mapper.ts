import { UserDto } from 'src/app/core/dto/user.dto';
import { User } from 'src/app/core/entity';
import { Mapper } from 'src/app/core/arch';

export class UserRepositoryMapper extends Mapper<UserDto, User> {
  mapFrom(param: User): UserDto {
    return {
      UserName: param.UserName,
      Email: param.Email,
    };
  }

  mapTo(param: User): UserDto {
    return {
      UserName: param.UserName,
      Email: param.Email,
    };
  }
}
