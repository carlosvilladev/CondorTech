select userRole.cd_role_type "User Type",
(
    select count(*)
    from user_role userRole1
    where userRole1.in_status = 1
    and userRole1.cd_role_type = userRole.cd_role_type
    group by userRole1.cd_role_type
) "Total Active",
count(*) "No Middle Name"
from user_profile userProfile
inner join user_role userRole on userRole.id_user = userProfile.id_user
where userProfile.nm_middle is null or userProfile.nm_middle = ''
group by userRole.cd_role_type

