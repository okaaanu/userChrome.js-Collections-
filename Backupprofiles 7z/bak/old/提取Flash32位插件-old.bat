
::2015.06.27 11:00  添加提取時間
::2015.06.25 13:00  實現獲取Flash版本號
::2015.06.23 18:00  Create

echo off
Title 提取Flash32位插件
rem 設置備份路徑以及臨時文件夾
cd /d %~dp0
set BackDir=C:\Windows\SysWOW64\Macromed\Flash
set TempFolder=D:\Flash32

::複製插件到臨時文件夾
xcopy "%BackDir%\NPSWF32*.dll" %TempFolder%\  /s /y /i
xcopy "%BackDir%\FlashPlayerPlugin*.exe" %TempFolder%\  /s /y /i
xcopy "%BackDir%\plugin.vch" %TempFolder%\  /s /y /i

::讀取版本號
::找了好久，妙終於在這個回答找到了答案：http://zhidao.baidu.com/question/289963233.html
for /f "delims=" %%i in ('dir /a-d /b "%BackDir%\NPSWF32*.dll"') do (set ver=%%i)
echo %ver%

::完整日期和時間
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
set ArchiveName=D:\%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

::小時數小于10点時的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set ArchiveName=D:\%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

rem 開始備份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q

ECHO.&ECHO.已打包完成，請按任意鍵退出，將跳轉到系統/控制面板/程序與功能！&PAUSE >NUL 2>NUL

::跳轉到系統/控制面板/程序與功能
appwiz.cpl
rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl

@exit