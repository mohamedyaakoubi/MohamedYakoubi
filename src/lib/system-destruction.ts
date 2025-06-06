import type { DeletionSequence, TerminalLine } from '@/types/terminal'

export const deletionSequence: DeletionSequence[] = [
  // Stage 1: Basic system files (30ms - faster)
  { files: [
    'rm: removing /bin/bash',
    'rm: removing /bin/ls',
    'rm: removing /bin/cat',
    'rm: removing /bin/grep',
    'rm: removing /bin/ps',
    'rm: removing /bin/kill',
    'rm: removing /bin/mount',
    'rm: removing /bin/umount',
    'rm: removing /bin/chmod',
    'rm: removing /bin/chown',
    'rm: removing /bin/cp',
    'rm: removing /bin/mv',
    'rm: removing /bin/rm',
    'rm: removing /bin/mkdir',
    'rm: removing /bin/rmdir',
    'rm: removing /bin/pwd',
    'rm: removing /bin/which',
    'rm: removing /bin/whereis',
    'rm: removing /bin/whoami',
    'rm: removing /bin/id',
  ], stage: 1, interval: 30 },
  
  // Stage 2: UI and font libraries (25ms - navigation breaks)
  { files: [
    'rm: removing /usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    'rm: removing /usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    'rm: removing /usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    'rm: removing /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    'rm: removing /usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
    'rm: removing /usr/share/fonts/truetype/ubuntu/Ubuntu-Regular.ttf',
    'rm: removing /usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf',
    'rm: removing /lib/x86_64-linux-gnu/libfreetype.so.6',
    'rm: removing /lib/x86_64-linux-gnu/libfontconfig.so.1',
    'rm: removing /usr/lib/x86_64-linux-gnu/libcairo.so.2',
    'rm: removing /usr/lib/x86_64-linux-gnu/libpango-1.0.so.0',
    'rm: removing /usr/lib/x86_64-linux-gnu/libharfbuzz.so.0',
  ], stage: 2, interval: 25 },
  
  // Stage 3: Web technologies (20ms - chat and language selector break)
  { files: [
    'rm: removing /usr/bin/node',
    'rm: removing /usr/bin/npm',
    'rm: removing /usr/bin/yarn',
    'rm: removing /usr/lib/nodejs/lib/http.js',
    'rm: removing /usr/lib/nodejs/lib/https.js',
    'rm: removing /usr/lib/nodejs/lib/fs.js',
    'rm: removing /usr/lib/nodejs/lib/path.js',
    'rm: removing /var/www/html/index.html',
    'rm: removing /var/www/html/style.css',
    'rm: removing /var/www/html/script.js',
    'rm: removing /var/www/html/app.js',
    'rm: removing /usr/share/nginx/html/50x.html',
    'rm: removing /etc/nginx/nginx.conf',
    'rm: removing /etc/apache2/apache2.conf',
  ], stage: 3, interval: 20 },
  
  // Stage 4: Display and graphics (18ms - theme toggle breaks)
  { files: [
    'rm: removing /usr/bin/gdm3',
    'rm: removing /usr/bin/lightdm',
    'rm: removing /usr/bin/startx',
    'rm: removing /usr/lib/xorg/Xorg',
    'rm: removing /usr/lib/xorg/modules/drivers/intel_drv.so',
    'rm: removing /usr/lib/xorg/modules/drivers/radeon_drv.so',
    'rm: removing /usr/lib/xorg/modules/drivers/nouveau_drv.so',
    'rm: removing /lib/modules/5.15.0/kernel/drivers/gpu/drm/i915/i915.ko',
    'rm: removing /lib/modules/5.15.0/kernel/drivers/gpu/drm/radeon/radeon.ko',
    'rm: removing /usr/lib/x86_64-linux-gnu/libX11.so.6',
    'rm: removing /usr/lib/x86_64-linux-gnu/libGL.so.1',
    'rm: removing /usr/lib/x86_64-linux-gnu/libwayland-client.so.0',
  ], stage: 4, interval: 18 },
  
  // Stage 5: Navigation and footer (15ms)
  { files: [
    'rm: removing /etc/passwd',
    'rm: removing /etc/shadow',
    'rm: removing /etc/group',
    'rm: removing /etc/hosts',
    'rm: removing /etc/hostname',
    'rm: removing /etc/resolv.conf',
    'rm: removing /etc/fstab',
    'rm: removing /etc/mtab',
    'rm: removing /boot/vmlinuz-5.15.0-generic',
    'rm: removing /boot/initrd.img-5.15.0-generic',
    'rm: removing /boot/grub/grub.cfg',
    'rm: removing /sbin/init',
    'rm: removing /usr/lib/systemd/systemd',
    'rm: removing /usr/lib/systemd/systemd-logind',
  ], stage: 5, interval: 15 },
  
  // Stage 6: Final destruction (12ms)
  { files: [
    'rm: removing /lib/x86_64-linux-gnu/libc.so.6',
    'rm: removing /lib/x86_64-linux-gnu/libpthread.so.0',
    'rm: removing /lib/x86_64-linux-gnu/libm.so.6',
    'rm: removing /lib',
    'rm: removing /usr/lib',
    'rm: removing /usr/bin',
    'rm: removing /usr/sbin',
    'rm: removing /var/log',
    'rm: removing /var/tmp',
    'rm: removing /var/cache',
    'rm: removing /home',
    'rm: removing /root',
    'rm: removing /proc',
    'rm: removing /sys',
    'rm: removing /dev',
    'rm: removing /tmp',
    'rm: removing /opt',
    'rm: removing /srv',
    'rm: removing /mnt',
    'rm: removing /media',
    '',
    'Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)',
    'end Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)',
    '',
    'System halted.',
    '',
  ], stage: 6, interval: 12 }
]

export const createSystemDestruction = (
  setTerminalLines: (updater: (prev: TerminalLine[]) => TerminalLine[]) => void,
  setDeletionStage: (stage: number) => void,
  setIsSystemDestroyed: (value: boolean) => void,
  terminalRef: React.RefObject<HTMLDivElement | null>
) => {
  return () => {
    let currentIndex = 0
    let sequenceIndex = 0

    const processNextDeletion = () => {
      if (sequenceIndex >= deletionSequence.length) {
        setTimeout(() => {
          // Create a temporary anchor element to open in new tab
          const link = document.createElement('a')
          link.href = 'https://youtu.be/dQw4w9WgXcQ'
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
          
          // Temporarily add to DOM for browser compatibility
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }, 3000)
        return
      }

      const currentSequence = deletionSequence[sequenceIndex]
      
      if (currentIndex < currentSequence.files.length) {
        const file = currentSequence.files[currentIndex]
        
        setTerminalLines(prev => [...prev, { 
          type: file.includes('Kernel panic') || file.includes('System halted') ? 'error' : 
                file.includes('Just kidding') || file.includes('Redirecting') ? 'output' : 'error', 
          content: file 
        }])

        setDeletionStage(currentSequence.stage)

        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        }, 10)

        currentIndex++
        setTimeout(processNextDeletion, currentSequence.interval)
      } else {
        sequenceIndex++
        currentIndex = 0
        setTimeout(processNextDeletion, currentSequence.interval * 2)
      }
    }

    processNextDeletion()

    setTimeout(() => {
      setIsSystemDestroyed(true)
    }, 6000)
  }
}