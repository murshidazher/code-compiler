import json
import Solution

def stringToIntegerList(input):
    return json.loads(input)

def stringToInt(input):
    return int(input)

def integerListToString(nums, len_of_list=None):
    if not len_of_list:
        len_of_list = len(nums)
    return json.dumps(nums[:len_of_list])

def main():
    with open('./questions/two-sum/testcase.txt', "r") as f:
        lines = f.readlines()
    i = 0
    passall = True
    test_result = []
    while i < len(lines) :
        line = lines[i]
        nums = stringToIntegerList(line)
        if (nums == "null") :
            nums = None
        #print nums
        line = lines[i+1]
        #print line
        target = stringToInt(line)
        line = lines[i+2]
        #print line
        expected = stringToIntegerList(line)
        
        try:
            ret = Solution.Solution().twoSum(nums, target)

            if (expected != ret) :
                if (nums is None) :
                    strnums = 'null'
                else:
                    strnums = integerListToString(nums)
                
                test_result.append("[Fail] " + " [Input] " + strnums + ", " + str(target) + "  [Returned] " + integerListToString(ret) + " [Expected] " + integerListToString(expected))
                passall = False
                # break
            else:
                test_result.append("[Success] Your solution passed")
        except expression as identifier:
            test_result.append("[Fail] exception")
        finally:
            i = i + 3
        

        
        #print out

    # if passall == True :
        # print("[Success] Your solution passed all " + str(len(lines)/3) + " test cases!")
    
    print(test_result)

if __name__ == '__main__':
    main()