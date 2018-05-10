
select count(*) as "Non Active Providers" 
from user_role userRole
inner join user_profile userProfile on userProfile.id_user = userRole.id_user
where userRole.cd_role_type = 'PROVIDER'
and userRole.in_status = 0
group by userRole.cd_role_type