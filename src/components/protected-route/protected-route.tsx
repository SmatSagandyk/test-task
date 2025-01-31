import { FC, ReactElement } from "react";
import {
  createSearchParams,
  Navigate,
  useSearchParams,
} from "react-router-dom";

import { getAccount, getIsAuthChecked } from "../../services/account/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { _HOME_PATH, _LOGIN_PATH } from "../../utils/vars";
import Loading from "../loading/loading";

interface IProps {
  onlyAuth?: boolean;
  component: ReactElement;
}

const ProtectedRoute: FC<IProps> = ({ onlyAuth = true, component }) => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getAccount);

  const [searchParams] = useSearchParams();

  if (!isAuthChecked) {
    // запрос в процессе
    return <Loading />;
  }

  if (user && !onlyAuth) {
    // пользователь авторизован, но роут для неавторизованных пользователей
    // редирект на главную или на location.state.from
    return (
      <Navigate
        to={{
          pathname: _HOME_PATH,
          search: createSearchParams(searchParams).toString(),
        }}
      />
    );
  }

  if (!user && onlyAuth) {
    // пользователь неавторизован, но роут для авторизованных пользователей
    // return <Navigate to={pathname={_LOGIN_PATH}, option={searchParams}} />;
    return (
      <Navigate
        to={{
          pathname: _LOGIN_PATH,
          search: createSearchParams(searchParams).toString(),
        }}
      />
    );
  }

  // авторизация пользователя и доступ к роуту совпадают`
  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
  <ProtectedRoute onlyAuth={false} component={component} />
);
