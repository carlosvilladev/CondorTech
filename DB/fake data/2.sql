select sum(q.total) "Active Licensees With Address Info"
from (
    select count(*) total
    from user_role userRole
    inner join user_address userAddress on userAddress.id_user = userRole.id_user
    where userRole.cd_role_type in ('LICENSEE', 'LIMITED')
    and userRole.in_status = 1
    and userAddress.id_address > 0
    and userRole.id_user > 0
    group by userRole.cd_role_type
) q

