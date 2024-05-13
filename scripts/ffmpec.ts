import * as ssh from "node-ssh";
import * as ChildProcess from "child_process";

// const sequences: string[] = [

const TARGET_SEQUENCES = [
  "0115_1/004",
  "0115_1/005",
  "0115_1/006",
  "0115_1/007",
  "0115_1/009",
  "0115_1/010",
  "0116_1/003",
  "0116_1/004",
  "0116_1/005",
  "0116_1/006",
  "0116_1/007",
  "0116_1/008",
  "0116_1/009",
  "0116_3/003",
  "0116_3/004",
  "0116_3/005",
  "0116_3/006",
  "0116_3/008",
  "0117_1/003",
  "0117_1/004",
  "0117_1/005",
  "0117_1/006",
  "0117_1/007",
  "0117_1/008",
  "0118_1/003",
  "0118_1/004",
  "0118_1/005",
  "0118_1/006",
  "0118_1/007",
  "0118_1/008",
  "0118_1/009",
  "0118_3/003",
  "0118_3/004",
  "0118_3/005",
  "0118_3/006",
  "0118_3/007",
  "0118_3/008",
  "0118_3/009",
  "0119_1/003",
  "0119_1/004",
  "0119_1/006",
  "0119_1/007",
  "0119_1/008",
  "0119_3/003",
  "0119_3/004",
  "0119_3/005",
  "0119_3/006",
  "0119_3/007",
  "0119_3/008",
  "0122_1/003",
  "0122_1/004",
  "0122_1/005",
  "0122_3/003",
  "0122_3/004",
  "0122_3/005",
  "0122_3/006",
  "0122_3/008",
  "0122_3/009",
  "0123_1/003",
  "0123_1/004",
  "0123_1/005",
  "0123_1/006",
  "0123_1/007",
  "0123_1/008",
  "0123_1/009",
  "0124_1/003",
  "0124_1/004",
  "0124_1/005",
  "0124_1/006",
  "0124_1/007",
  "0124_1/008",
  "0124_1/009",
  "0124_3/003",
  "0124_3/004",
  "0124_3/005",
  "0124_3/006",
  "0124_3/007",
  "0124_3/008",
  "0124_3/009",
  "1023_1/004",
  "1023_1/005",
  "1023_1/006",
  "1023_1/008",
  "1023_1/009",
  "1023_1/010",
  "1023_1/011",
  "1023_2/003",
  "1023_2/004",
  "1023_2/006",
  "1023_3/003",
  "1023_3/004",
  "1023_3/008",
  "1023_3/009",
  "1023_3/010",
  "1024_2/003",
  "1024_2/004",
  "1024_2/005",
  "1024_3/003",
  "1024_3/004",
  "1025_2/003",
  "1025_2/004",
  "1025_2/005",
  "1025_2/006",
  "1025_3/003",
  "1025_3/004",
  "1025_3/005",
  "1025_3/006",
  "1025_3/007",
  "1025_3/008",
  "1026_1/003",
  "1026_1/004",
  "1026_1/005",
  "1026_1/006",
  "1026_1/007",
  "1026_1/008",
  "1026_1/009",
  "1026_3/003",
  "1026_3/004",
  "1026_3/005",
  "1026_3/006",
  "1026_3/007",
  "1026_3/008",
  "1026_3/009",
  "1027_2/003",
  "1027_2/004",
  "1027_2/005",
  "1027_2/006",
  "1027_2/007",
  "1027_2/008",
  "1027_2/009",
  "1028_2/003",
  "1028_2/004",
  "1028_2/006",
  "1028_2/008",
  "1028_2/009",
  "1028_2/010",
  "1028_2/011",
  "1029_3/003",
  "1029_3/004",
  "1029_3/005",
  "1029_3/006",
  "1029_3/007",
  "1029_3/008",
  "1029_3/009",
  "1030_3/003",
  "1030_3/004",
  "1030_3/005",
  "1030_3/006",
  "1030_3/007",
  "1030_3/008",
  "1030_3/009",
  "1031_3/003",
  "1031_3/004",
  "1031_3/005",
  "1031_3/006",
  "1031_3/007",
  "1031_3/008",
  "1031_3/009",
  "1031_3/010",
  "1101_3/003",
  "1101_3/004",
  "1101_3/005",
  "1101_3/006",
  "1101_3/007",
  "1101_3/008",
  "1101_3/009",
  "1102_3/003",
  "1102_3/004",
  "1102_3/005",
  "1102_3/006",
  "1102_3/008",
  "1102_3/010",
  "1103_3/003",
  "1103_3/004",
  "1103_3/005",
  "1103_3/006",
  "1103_3/007",
  "1103_3/008",
  "1103_3/009",
  "1104_1/003",
  "1104_1/004",
  "1104_1/006",
  "1104_1/007",
  "1104_1/008",
  "1104_1/009",
  "1104_2/003",
  "1104_2/004",
  "1104_2/005",
  "1106_2/003",
  "1106_2/004",
  "1106_2/005",
  "1106_2/007",
  "1106_2/008",
  "1106_2/009",
  "1106_2/010",
  "1107_2/003",
  "1107_2/004",
  "1107_2/005",
  "1107_2/006",
  "1107_2/007",
  "1107_2/008",
  "1107_2/009",
  "1107_3/003",
  "1107_3/004",
  "1107_3/005",
  "1107_3/006",
  "1107_3/007",
  "1108_1/003",
  "1108_1/004",
  "1108_1/005",
  "1108_1/006",
  "1108_1/007",
  "1108_1/008",
  "1108_1/009",
  "1108_2/003",
  "1108_2/004",
  "1108_2/005",
  "1109_3/003",
  "1109_3/004",
  "1109_3/005",
  "1109_3/006",
  "1109_3/007",
  "1109_3/008",
  "1110_2/003",
  "1110_2/004",
  "1110_2/005",
  "1110_2/006",
  "1110_2/007",
  "1110_2/008",
  "1110_2/009",
];

const SSH_CONFIG = {
  host: "192.168.0.182", // 원격 서버 IP 주소 또는 호스트 이름
  port: 22,
  username: "snuvcl", // 원격 서버 사용자 이름
  password: "Capture138*", // 원격 서버 비밀번호
};

const SAMPLE_FILES = ["039.mp4", "064.mp4", "059.mp4", "017.mp4"];

async function main() {
  for await (const sequence of TARGET_SEQUENCES) {
    for await (const file of SAMPLE_FILES) {
      const result = ChildProcess.execSync(
        `scp ${SSH_CONFIG.username}@${SSH_CONFIG.host}:/volume1/hoi/${sequence}/undistorted/${file} data`,
        { encoding: "utf-8" }
      );
      console.log(result);
    }
  }
}

main();