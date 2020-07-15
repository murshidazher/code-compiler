import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

public class SolutionTester {
    private static final String TESTCASE_FILE = "../testcase.txt";

    public static void main(String[] args) {
        Solution solution = new Solution();
        ArrayList<String> testCaseResults = new ArrayList<String>();

        //System.out.println("testTwoSum");
        
        boolean testResult = true;
        try {
            BufferedReader br = new BufferedReader(new FileReader(TESTCASE_FILE));
            try {
                String line;
                int count = 0;
                while ((line = br.readLine()) != null) {
                    int[] nums = ParserUtil.stringToIntegerArray(line);
                    line = br.readLine();
                    int target = Integer.parseInt(line);
                    line = br.readLine();
                    int[] expected = ParserUtil.stringToIntegerArray(line);
                    // create an test execution
                    int[] ret = solution.twoSum(nums, target);

                    //String out = ParserUtil.integerArrayToString(ret);

                    // create a test display name
                    // String testCase = "Test Two Sum: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                    //System.out.println(testCase);

                    testResult = Arrays.equals(expected, ret);
                    count++;
                    
                    if (!testResult) {
                        // String content = "[Fail]Failed at: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                        // System.out.println("[Fail]" + Arrays.toString(nums) + ", " + target + ";" + Arrays.toString(ret) + ";" + Arrays.toString(expected));
                        testCaseResults.add("[Fail] " + " [Input] " + Arrays.toString(nums) + ", " + target + "  [Returned] " + Arrays.toString(ret) + " [Expected] " + Arrays.toString(expected));
                    
                        // break;
                    } else {
                        testCaseResults.add("[Success] Your solution passed");
                    }
                }
                // if (testResult) {

                //     System.out.println("[Success]Your solution passed all " + count +" test cases!");
                //     saveTestResult("[Success]Your solution passed all " + count +" test cases!");
                // }
            }
            catch (Exception io) {
                System.out.println(io.getMessage());
            }
            finally {
                br.close();
            }
        }
        catch (IOException ioe) {
            System.out.println(ioe.getMessage());
           
        } finally {
            Iterator iter = testCaseResults.iterator();
            while (iter.hasNext()) {

                System.out.println(iter.next());
                if(iter.hasNext()) {
                    System.out.print(", ");
                }
            }
        }
    }

}