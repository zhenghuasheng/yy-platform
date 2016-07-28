package com.order.server;

import com.etong.pt.utility.PtResult;
import com.order.data.model.TokenParam;

/**权限验证服务
 * Created by zhenghuasheng on 2016/5/28.
 */
public interface AuthServer {

    PtResult createToken(TokenParam tokenParam);
    PtResult parseToken(String token);
}
